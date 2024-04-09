"use server";

export async function getUsdRate() {
  "use server";
  const data = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const averageRate = 38.8;
  let rateResponse;
  try {
    rateResponse = await fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
      data,
    );
  } catch (e) {
    console.log(e);
    return averageRate;
  }

  type RateListType = {
    r030: number;
    txt: string;
    rate: number;
    cc: string;
    exchangedate: string;
  };

  return rateResponse
    .json()
    .then((rateList: RateListType[]) => {
      const found = rateList.find((el) => el.cc === "USD");
      return found ? found.rate : averageRate;
    })
    .catch((e) => {
      console.log(e);
      return averageRate;
    });
}
