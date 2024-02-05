import { Block } from "@/components/ui/Block/Block";
import {RowContainer} from "@/components/ui/Containers/Containers";
import s from './TeamList.module.scss'
import Image from "next/image";

export function TeamList() {
  return (
    <RowContainer gap={24}>
      <Block>
        <div className={s.teamCard}>
          <img src={"/team/Artem.png"} alt={"Artem"}/>
          <p className={s.teamCard_name}>Artem</p>
          <p className={s.teamCard_role}>Co-Founder</p>
        </div>
      </Block>
      <Block>
        <div className={s.teamCard}>
          <img src={"/team/Markian.png"} alt={"Markian"}/>
          <p className={s.teamCard_name}>Markian Ivanichok</p>
          <p className={s.teamCard_role}>Co-Founder</p>
        </div>
      </Block>
      <Block>
        <div className={s.teamCard}>
          <div className={s.teamCard_empty}>
              <Image src={"/team/anon.svg"} alt={"anon"} width={90} height={95}/>
          </div>
          <p className={s.teamCard_name}>Serhii Nykonorov</p>
          <p className={s.teamCard_role}>COO</p>
        </div>
      </Block>
      <Block>
        <div className={s.teamCard}>
          <img src={"/team/Tony.png"} alt={"Tony"}/>
          <p className={s.teamCard_name}>Tony Tonite</p>
          <p className={s.teamCard_role}>Music expert</p>
        </div>
      </Block>
    </RowContainer>
  );
}
