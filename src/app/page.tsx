import s from "./page.module.scss";
import { Section } from "@/components/ui/Section/Section";
import {
  ColumnContainer,
  SpaceBetweenContainer,
} from "@/components/ui/Containers/Containers";
import { Button } from "@/components/ui/Button/Button";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { FlowList } from "@/components/homepage/FlowList/FlowList";
import { Terms } from "@/components/homepage/Terms/Terms";
import { Roadmap } from "@/components/homepage/Roadmap/Roadmap";
import { TeamList } from "@/components/homepage/TeamList/TeamList";
import { FaqCard } from "@/components/homepage/FaqCard/FaqCard";
import { faqData, firstQuestion } from "@/data/faqData";
import { AlbumCard } from "@/components/homepage/AlbumCard/AlbumCard";
import { Albums } from "@/components/homepage/Albums/Albums";
import { flowListData } from "@/data/flowListData";

export default function Home() {
  return (
    <main className={s.main}>
      <Header />
      {/*  Banner */}
      <Section banner={true} id={"home-banner"}>
        <div className={s.bannerContainer}>
          <div className={s.shadowTop} />
          <ColumnContainer>
            <h2>Welcome to MusicDex</h2>
            <p>Invest in Music Royalties and Shape the Future of Music</p>
            <Button
              title={"Learn more"}
              color={"red"}
              path={"#home-how-it-works"}
            />
          </ColumnContainer>
          <Albums />
          <div className={s.shadowBottom} />
        </div>
      </Section>
      {/*  How it works */}
      <div className={s.lightThemeWrapper}>
        <Section id={"home-how-it-works"}>
          <div className={s.howItWorksContainer}>
            <ColumnContainer>
              <h3>MusicDex revolutionizes music investment</h3>
              <p style={{ width: "100%" }}>Here&#39;s how it work:</p>
            </ColumnContainer>
            <FlowList listData={flowListData} symbol={"0"} />
          </div>
        </Section>
      </div>
      {/*  Our terms */}
      <div className={s.gradientWrapper}>
        <Section id={"home-terms"}>
          <ColumnContainer centered={true}>
            <h3>Invest with confidence</h3>
            <h5>Our terms include:</h5>
          </ColumnContainer>
          <Terms />
        </Section>
      </div>
      {/* Roadmap */}
      <Section id={"home-roadmap"}>
        <ColumnContainer centered={true}>
          <h3>Roadmap</h3>
          <h5>Join us on our journey:</h5>
          <Roadmap />
        </ColumnContainer>
      </Section>
      {/* Team */}
      <Section id={"home-team"}>
        <div className={s.teamContainer}>
            <h3 style={{ maxWidth: 510 }}>Meet the faces behind MusicDex</h3>
            <TeamList />
        </div>
      </Section>
      {/* FAQ */}
      <Section id={"home-faq"}>
        <div className={s.faqContainer}>
          <ColumnContainer>
            <h3>FAQ</h3>
            <p className={s.faqDescriptionText}>
              Do you need some help with something or do you have questions on
              some features?
            </p>
          </ColumnContainer>
          <ColumnContainer>
            <FaqCard
              question={firstQuestion.question}
              answer={firstQuestion.answer}
              first={true}
            ></FaqCard>
            {faqData.map((data, index) => {
              return (
                <FaqCard
                  key={index.toString()}
                  question={data.question}
                  answer={data.answer}
                />
              );
            })}
          </ColumnContainer>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
