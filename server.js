const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const { GoogleAuth } = require("google-auth-library");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/api/chat", async (req, res) => {
  const { text } = req.body;
  console.log("Received text from frontend:", text);

  try {
    const gptApiKey = process.env.GPT_API_KEY;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gptApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "This assistant searches for topics related to cars and understands Korean.",
          },
          { role: "user", content: text },
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get response from GPT API: ${response.status} - ${response.statusText}`
      );
    }

    const responseData = await response.json();
    const gptMessage = responseData.choices[0].message;
    console.log("Message from OpenAI:", gptMessage);

    res.json({ message: gptMessage.content });
  } catch (error) {
    console.error("Error during GPT API request:", error);
    res.status(500).json({ error: error.message });
  }
});


app.post("/api/vehicle", async (req, res) => {
  const { model, year } = req.body;
  console.log(`Vehicle model and year request: ${model} ${year}`);

  if (!model || !year) {
    return res.status(400).json({ error: "Both model and year are required." });
  }

  let statusCode = 500;

  try {
    const REGION = "asia-northeast3"; // 실제 배포 지역으로 업데이트
    const PROJECT_ID = "focal-time-421105";
    const MODEL_NAME = "gemini-1.5-pro-preview-0409";
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform'
    });

    // 확인된 엔드포인트 URL 구조는 Vertex AI 문서 참조
    const apiUrl = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/google/models/${MODEL_NAME}:streamGenerateContent`;

    console.log("Vertex AI 요청...");
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.token}`
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: `${year}년식 ${model} 차량 정보` }]
        }],
        systemInstruction: {
          role: "assistant",
          parts: [{
            text: "사용자가 입력한 차량 연식과 모델에 따른 차량 제원(차량설명, 가격, 연료, 연비, 제조사, 차종, 안전 등급을 포함하여 기타 자동차 제원을 최대한 자세하게)을 키와 값 형식으로 한국어로 응답."
          }]
        },
        generationConfig: {
          temperature: 0.1,
          topP: 1,
          topK: 10,
          candidateCount: 1,
          maxOutputTokens: 2048,
          stopSequences: [],
          responseMimeType: "application/json",
        }
      }),
    });

    if (!response.ok) {
      statusCode = response.status;
      const errorText = await response.text();
      throw new Error(`Vertex AI 응답 실패: ${statusCode} - ${response.statusText}, 본문: ${errorText}`);
    }

    console.log("Vertex AI 응답 받음");
    const responseData = await response.json();
    console.log("파싱된 응답 데이터:", JSON.stringify(responseData, null, 2));

    const vehicleSpecs = parseVehicleSpecsFromResponse(responseData);
    if (vehicleSpecs) {
      res.json({ vehicleSpecs });
    } else {
      res.status(404).json({ error: "Vehicle specifications not found." });
    }
  } catch (error) {
    console.error("Vertex AI 요청 중 오류 발생:", error);
    res.status(statusCode).json({ error: error.message });
  }
});

function parseVehicleSpecsFromResponse(responseData) {
  let specs = {};

  responseData.forEach(data => {
    const candidate = data.candidates[0]; // 후보 요소 중 첫 번째 요소 선택

    // content.parts 배열을 합쳐서 하나의 텍스트로 만든다.
    const contentText = candidate.content.parts.reduce((text, part) => text + part.text, "");
    console.log(contentText); 
    // 만약 contentText가 JSON 형식으로 시작하고 끝나지 않는다면,
    if (contentText.startsWith('{') && contentText.endsWith('}')) {
      try {
        // JSON 형식일 경우 JSON으로 파싱하여 specs 객체에 병합한다.
        const jsonContent = JSON.parse(contentText);
        Object.assign(specs, jsonContent);

      } catch (error) {
        // JSON 파싱 에러 발생 시 콘솔에 로그 출력
        console.error('Error parsing JSON:', error);
      }
    } else {
      // JSON 형식이 아닌 경우 줄바꿈을 공백으로 대체하고 각 키-값 쌍을 추출하여 객체로 반환한다.
      const keyValuePairs = contentText.split('\n').map(line => {
        const [key, ...value] = line.split(':');
        const trimmedKey = key.trim();
        const trimmedValue = value.join(':').replace(/\n/g, " ").trim(); // 줄바꿈을 공백으로 대체하고 공백 제거
        return trimmedKey && trimmedValue ? { [trimmedKey]: trimmedValue } : {};
      });      
      
      // specs 객체에 추출된 키-값 쌍을 병합한다.
      Object.assign(specs, ...keyValuePairs);
    }
  });

  // 완성된 specs 객체 반환
  console.log(specs);
  return specs;
}

// 서버를 지정된 포트로 실행
app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`));
