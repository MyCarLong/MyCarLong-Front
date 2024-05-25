import React, { useEffect, useRef, useReducer } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { computeDistanceBetween } from "spherical-geometry-js";

const googleMapsLibraries = ["places"];

const MapContainer = styled.div`
  display: flex;
  height: 80vh;
  padding: 20px;
`;

const MapWrapper = styled.div`
  flex: 1;
  height: 100%;
  padding: 10px;
  max-height: 90%;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  overflow: auto;
  height: 100%;
  padding: 10px;
`;

const MenuItem = styled.span`
  margin-right: 15px;
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  transition: color 0.3s;
  &:hover {
    color: #333;
  }
`;

const Menu = styled.div`
  margin-bottom: 15px;
  display: flex;
`;

const PlaceListContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f4f5f7; 
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
`;

const PlaceItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ddd;
  }
`;

const PlaceName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PlaceDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const initialState = {
  location: null,
  places: [],
  loading: true,
  selectedPlace: null,
  selectedCategory: "gas_station",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOCATION":
      return { ...state, location: action.payload, loading: false };
    case "SET_PLACES":
      return { ...state, places: action.payload };
    case "SELECT_PLACE":
      return { ...state, selectedPlace: action.payload };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
        selectedPlace: null,
      };
    default:
      return state;
  }
}

function MapComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { location, places, loading, selectedPlace, selectedCategory } = state;
  const mapRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: "SET_LOCATION",
          payload: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      () => {
        console.error("Failed to get user's location");
      }
    );
  }, []);

  const loadPlaces = (map, center) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not loaded");
      return;
    }
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: "1000",
      types: [selectedCategory],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const sortedResults = results
          .map((place) => ({
            ...place,
            distance: computeDistanceBetween(
              new window.google.maps.LatLng(center),
              new window.google.maps.LatLng(place.geometry.location)
            ),
            rating: place.rating ? place.rating : "No rating",
          }))
          .sort((a, b) => a.distance - b.distance);
        dispatch({ type: "SET_PLACES", payload: sortedResults });
      }
    });
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
    if (location) {
      loadPlaces(map, location);
    }
  };

  const handleMarkerClick = (place) => {
    dispatch({ type: "SELECT_PLACE", payload: place });
  };

  const handleCategoryChange = (category) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: category });
  };

  useEffect(() => {
    if (!loading && location) {
      loadPlaces(mapRef.current, location);
    }
  }, [selectedCategory, loading, location]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={googleMapsLibraries}
      async 
    >
      <MapContainer>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <MapWrapper>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={location}
                zoom={15}
                onLoad={onMapLoad}
                onClick={(e) =>
                  location && loadPlaces(mapRef.current, e.latLng)
                }
              >
                {places.map((place, index) => (
                  <Marker
                    key={index}
                    position={place.geometry.location}
                    onClick={() => handleMarkerClick(place)}
                  />
                ))}
                {selectedPlace && (
                  <InfoWindow
                    position={selectedPlace.geometry.location}
                    onCloseClick={() =>
                      dispatch({ type: "SELECT_PLACE", payload: null })
                    }
                  >
                    <div>
                      <h3>{selectedPlace.name}</h3>
                      <p>{selectedPlace.vicinity}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </MapWrapper>
            <Sidebar>
              <Menu>
                <MenuItem
                  selected={selectedCategory === "gas_station"}
                  onClick={() => handleCategoryChange("gas_station")}
                >
                  주유소
                </MenuItem>
                <MenuItem
                  selected={selectedCategory === "car_repair"}
                  onClick={() => handleCategoryChange("car_repair")}
                >
                  서비스센터
                </MenuItem>
                <MenuItem
                  selected={selectedCategory === "parking"}
                  onClick={() => handleCategoryChange("parking")}
                >
                  주차장
                </MenuItem>
                <MenuItem
                  selected={selectedCategory === "car_wash"}
                  onClick={() => handleCategoryChange("car_wash")}
                >
                  세차장
                </MenuItem>
              </Menu>
              <PlaceListContainer> {/* Changed PlaceList to PlaceListContainer */}
                {places.map((place, index) => (
                  <PlaceItem
                    key={index}
                    onClick={() => handleMarkerClick(place)}
                  >
                    <PlaceName>{place.name}</PlaceName>
                    <PlaceDetails>
                      {place.vicinity} | 거리: {Math.round(place.distance)}m |
                      평점: {place.rating}
                    </PlaceDetails>
                  </PlaceItem>
                ))}
              </PlaceListContainer>
            </Sidebar>
          </>
        )}
      </MapContainer>
    </LoadScript>
  );
}

export default MapComponent;
