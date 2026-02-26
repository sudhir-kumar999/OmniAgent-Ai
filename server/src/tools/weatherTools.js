// export async function get_weather({ city }) {
//   const res = await fetch(
//     `http://api.weatherapi.com/v1/current.json?key=8f747abf27274262a5120954261302&q=${city}&aqi=no`
//   );

//   const data = await res.json();

//   return data
// }

export async function get_weather(args, context) {
  const { city } = args;

  // console.log("User:", context.userId);

  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=8f747abf27274262a5120954261302&q=${city}&aqi=no`

    // `http://api.weatherapi.com/v1/current.json?key=KEY&q=${city}&aqi=no`
  );

  return await res.json();
}