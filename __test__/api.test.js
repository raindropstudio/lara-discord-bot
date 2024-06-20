require("dotenv").config();
const getCharacterOCID = require("../src/modules/maple-api-modules/character-info-modules/maple-ocid");
const getCharacterInfo = require("../src/modules/maple-api-modules/character-info-modules/maple-character-info");
const getCharacterStats = require("../src/modules/maple-api-modules/character-info-modules/maple-character-stats");
const getCashEquipmentInfo = require("../src/modules/maple-api-modules/character-info-modules/maple-cash-equipment");
const getArtifactInfo = require("../src/modules/maple-api-modules/character-info-modules/maple-character-artifact");
const getUnionInfo = require("../src/modules/maple-api-modules/character-info-modules/maple-character-union");

describe("MapleStory API 테스트", () => {
  const testNickname = "빙캔"; // 테스트할 캐릭터 닉네임

  test("OCID를 올바르게 가져오는지 테스트", async () => {
    expect.assertions(1); // 예상되는 assertion 수를 지정
    const characterOCID = await getCharacterOCID(testNickname);
    console.log("OCID:", characterOCID);
    expect(characterOCID).toBeDefined(); // OCID가 정의되어 있는지 확인
  });

  test("캐릭터 정보를 올바르게 가져오는지 테스트", async () => {
    expect.assertions(1);
    try {
      const characterInfo = await getCharacterInfo(testNickname); // OCID 대신 캐릭터 이름 사용
      console.log("Character Info:", characterInfo);
      expect(characterInfo).toHaveProperty("character_level"); // 캐릭터 정보에 "character_level" 속성이 있는지 확인
    } catch (error) {
      console.error("캐릭터 정보를 가져오는 중 오류가 발생했습니다: ", error.message);
      throw error; // 오류가 발생했음을 테스트에게 알립니다.
    }
  });

  test("캐릭터 스탯을 올바르게 가져오는지 테스트", async () => {
    expect.assertions(1);
    try {
      const characterStats = await getCharacterStats(testNickname);
      console.log("Character Stats:", characterStats);
      expect(characterStats).toHaveProperty("final_stat"); // 캐릭터 스탯에 "final_stat" 속성이 있는지 확인
    } catch (error) {
      console.error("캐릭터 스탯을 가져오는 중 오류가 발생했습니다: ", error.message);
      throw error;
    }
  });

  test("캐시 장비 정보를 올바르게 가져오는지 테스트", async () => {
    expect.assertions(1);
    try {
      const cashEquipmentInfo = await getCashEquipmentInfo(testNickname);
      console.log("Cash Equipment Info:", cashEquipmentInfo);
      expect(cashEquipmentInfo).toHaveProperty("cash_item_equipment_base"); // 캐시 장비 정보에 "cash_item_equipment_base" 속성이 있는지 확인
    } catch (error) {
      console.error("캐시 장비 정보를 가져오는 중 오류가 발생했습니다: ", error.message);
      throw error;
    }
  });

  test("아티팩트 정보를 올바르게 가져오는지 테스트", async () => {
    expect.assertions(1);
    try {
      const artifactInfo = await getArtifactInfo(testNickname);
      console.log("Artifact Info:", artifactInfo);
      expect(artifactInfo).toHaveProperty("union_artifact_effect"); // 아티팩트 정보에 "union_artifact_effect" 속성이 있는지 확인
    } catch (error) {
      console.error("아티팩트 정보를 가져오는 중 오류가 발생했습니다: ", error.message);
      throw error;
    }
  });

  test("유니온 정보를 올바르게 가져오는지 테스트", async () => {
    expect.assertions(1);
    try {
      const unionInfo = await getUnionInfo(testNickname);
      console.log("Union Info:", unionInfo);
      expect(unionInfo).toHaveProperty("union_level"); // 유니온 정보에 "union_level" 속성이 있는지 확인
    } catch (error) {
      console.error("유니온 정보를 가져오는 중 오류가 발생했습니다: ", error.message);
      throw error;
    }
  });
});
