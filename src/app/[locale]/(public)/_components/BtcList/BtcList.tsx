"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import s from "./BtcList.module.scss";

function Card(props: { name: string; icon: string; price: number }) {
  return (
    <div className={s.cardWrapper}>
      <Image src={props.icon} alt={props.name} width={40} height={40} />
      <p className={s.teamCard_name}>{props.name}</p>
      <span>-</span>
      <p className={s.teamCard_price}>${props.price}</p>
    </div>
  );
}

export function BtcList() {
  const [prices, setPrices] = useState<{ [key: string]: number }>({
    BTC: 0,
    ETH: 0,
    Solana: 0,
  });

  useEffect(() => {
    const btcSocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );

    btcSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);
      setPrices((prevPrices) => ({
        ...prevPrices,
        BTC: price,
      }));
    };

    const ethSocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/ethusdt@trade"
    );

    ethSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);
      setPrices((prevPrices) => ({
        ...prevPrices,
        ETH: price,
      }));
    };

    const solanaSocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/solusdt@trade"
    );

    solanaSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);
      setPrices((prevPrices) => ({
        ...prevPrices,
        Solana: price,
      }));
    };

    return () => {
      btcSocket.close();
      ethSocket.close();
      solanaSocket.close();
    };
  }, []);

  return (
    <>
      <div className={s.btcList}>
        <Card name={"BTC"} icon={"/icons/btc.svg"} price={prices.BTC} />
        <Card name={"ETH"} icon={"/icons/ethereum.svg"} price={prices.ETH} />
        <Card
          name={"Solana"}
          icon={"/icons/solana.svg"}
          price={prices.Solana}
        />
      </div>
      <BtcListSlider prices={prices} />
    </>
  );
}

export function BtcListSlider({
  prices,
}: {
  prices: { [key: string]: number };
}) {
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={s.btcList_mobile}>
      <Slider {...settings}>
        <Card name={"BTC"} icon={"/icons/btc.svg"} price={prices.BTC} />
        <Card name={"ETH"} icon={"/icons/ethereum.svg"} price={prices.ETH} />
        <Card
          name={"Solana"}
          icon={"/icons/solana.svg"}
          price={prices.Solana}
        />
      </Slider>
    </div>
  );
}
