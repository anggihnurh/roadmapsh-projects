import { type } from "arktype"

export const GeolocationAddress = type({
  "attraction?": "string",
  "building?": "string",
  "house_number?": "string",
  "road?": "string",
  "neighbourhood?": "string",
  "suburb?": "string",
  "city_district?": "string",
  "county?": "string",
  "city?": "string",
  "town?": "string",
  "village?": "string",
  "state?": "string",
  "state_district?": "string",
  "postcode?": "string",
  "country?": "string",
  "country_code?": "string"
})
export type GeolocationAddress = typeof GeolocationAddress.infer

export const GeolocationData = type({
  place_id: "string",
  licence: "string",
  osm_type: "string",
  osm_id: "string",
  lat: "string",
  lon: "string",
  display_name: "string",
  address: GeolocationAddress,
  boundingbox: "string[]"
})
export type GeolocationData = typeof GeolocationData.infer

// Aliases / helper schema exports
export const geolocationAddressSchema = GeolocationAddress
export const geolocationDataSchema = GeolocationData
export const geolocationSchema = GeolocationData
export type ReverseGeolocationResponse = GeolocationData
