import React, { useState, useEffect } from "react";
import "./Recommend.css";

const Recommend = () => {
  const [type, setType] = useState("");
  const [taste, setTaste] = useState("");
  const [res, setRes] = useState([]);

  const onClickType = (e) => {
    setType(e.target.value);
  };

  const onClickTaste = (e) => {
    setTaste(e.target.value);
  };

  const changeMenu = (e) => {
    setRes(foodMap.get(type).get(taste));
  };

  const initialize = (e) => {
    setType("");
    setTaste("");
  };

  const foodMap = new Map();

  const korMap = new Map();
  const japMap = new Map();
  const chiMap = new Map();
  const bunMap = new Map();
  const wesMap = new Map();

  korMap.set("meat", [
    "족발/보쌈",
    "삼겹살",
    "갈비찜",
    "찜닭",
    "곱창/대창",
    "닭갈비",
    "육회",
    "닭볶음탕",
    "돼지불백",
    "게장",
    "생선구이",
  ]);
  korMap.set("spicy", [
    "불닭",
    "쭈꾸미",
    "닭발",
    "매운 등갈비찜",
    "불족발",
    "닭갈비",
    "닭볶음탕",
    "아구찜",
  ]);
  korMap.set("relaxing", [
    "국밥",
    "감자탕",
    "비빔밥",
    "찜닭",
    "부대찌개",
    "김치찜",
    "김치찌개",
    "갈비탕",
    "된장찌개",
    "아구찜",
    "죽",
    "짜글이",
    "미역국",
  ]);

  japMap.set("meat", [
    "회",
    "초밥",
    "돈까스",
    "돈부리",
    "규동",
    "라멘",
    "텐동",
    "부타동",
    "연어",
  ]);
  japMap.set("spicy", ["카레", "라멘"]);
  japMap.set("relaxing", [
    "라멘",
    "규동",
    "부타동",
    "텐동",
    "우동",
    "카레",
    "모밀",
  ]);

  chiMap.set("meat", [
    "탕수육",
    "깐풍기",
    "마라샹궈",
    "차돌짬뽕",
    "만두",
    "난자완스",
    "라조육",
    "깐쇼새우",
    "꿔바로우",
  ]);
  chiMap.set("spicy", ["마라탕", "짬뽕", "사천짜장", "마파두부", "마라샹궈"]);
  chiMap.set("relaxing", [
    "짜장면",
    "볶음밥",
    "짬뽕",
    "마라탕",
    "마라샹궈",
    "탕수육",
    "만두",
  ]);

  bunMap.set("meat", ["튀김", "순대", "만두", "오뎅"]);
  bunMap.set("spicy", ["떡볶이", "라면", "육개장"]);
  bunMap.set("relaxing", ["우동", "김밥", "떡볶이", "라면", "오뎅", "육개장"]);

  wesMap.set("meat", ["치킨", "피자", "스테이크", "버거"]);
  wesMap.set("spicy", ["파스타", "치킨"]);
  wesMap.set("relaxing", ["피자", "미국식덮밥", "파스타", "필라프", "버거"]);

  foodMap.set("한식", korMap);
  foodMap.set("일식", japMap);
  foodMap.set("중식", chiMap);
  foodMap.set("분식", bunMap);
  foodMap.set("양식", wesMap);

  useEffect(() => {
    if (type !== "" && taste !== "") {
      setRes(foodMap.get(type).get(taste));
    }
  }, [type, taste]);

  return (
    <div className="recommend">
      {type === "" ? (
        <div className="">
          <h2 className="recommend-question">먹고 싶은 음식 종류는?</h2>
          <div className="choose-buttons type">
            <button
              onClick={onClickType}
              value="한식"
              className="choose-button"
            >
              한식
            </button>
            <button
              onClick={onClickType}
              value="일식"
              className="choose-button"
            >
              일식
            </button>
            <button
              onClick={onClickType}
              value="중식"
              className="choose-button"
            >
              중식
            </button>
            <button
              onClick={onClickType}
              value="분식"
              className="choose-button"
            >
              분식
            </button>
            <button
              onClick={onClickType}
              value="양식"
              className="choose-button"
            >
              양식
            </button>
          </div>
        </div>
      ) : taste === "" ? (
        <div>
          <h2 className="recommend-question">오늘은 이런게 땡긴다!</h2>
          <div className="choose-buttons taste">
            <button
              onClick={onClickTaste}
              value="meat"
              className="choose-button"
            >
              {" "}
              무조건 고기!
            </button>
            <button
              onClick={onClickTaste}
              value="spicy"
              className="choose-button"
            >
              매운 게 땡긴다!
            </button>
            <button
              onClick={onClickTaste}
              value="relaxing"
              className="choose-button"
            >
              든~든하고 속풀리는 음식!..
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 id="recommend-result">
            {res[Math.floor(Math.random() * res.length)]} 어때요?
          </h1>
          <div id="rechoice-button-div">
            <button onClick={changeMenu} className="choose-button">
              다른 거!
            </button>
            <button onClick={initialize} className="choose-button">
              다시 선택
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommend;
