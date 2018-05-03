import * as Utilities from "../src/utilities";

describe("test addressesAreEquals function", () => {
  it("addressesAreEquals", () => {
    expect(
      Utilities.addressesAreEquals(
        "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d",
        "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d"
      )
    ).toBeTruthy();

    expect(
      Utilities.addressesAreEquals(
        "0x612D7A97AFFc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d",
        "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d"
      )
    ).toBeTruthy();

    expect(
      Utilities.addressesAreEquals(
        "0x612D7A97AFFc491e814a7d64638511280",
        "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d"
      )
    ).toBeFalsy();
  });
});

describe("test findAddressInBlock function", () => {
  it("findAddressInBlock", () => {
    const addressToFind: string =
      "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d";

    const block = {
      transactions: [
        {
          hash: "1",
          from:
            "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d",
          to:
            "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d"
        },
        {
          hash: "2",
          from: "",
          to:
            "0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d"
        },
        {
          hash: "3",
          from: "",
          to: ""
        },
        {
          hash: "4",
          from: "0x612D7A97AFFc491e814a7d64638511280"
        }
      ]
    };

    expect(Utilities.findAddressInBlock(addressToFind, block)).toEqual([
      "1",
      "2"
    ]);
  });
});
