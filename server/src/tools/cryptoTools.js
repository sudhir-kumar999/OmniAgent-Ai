export async function cryptoCurrency(args,context) {
  const { coin } = args;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`
  );

  const data = await res.json();
return data
}
