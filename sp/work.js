self.addEventListener('message', function (e) {
    let data = e.data.data
    let klineData = e.data.klineData
    let list = [];
    data[0].forEach((item0) => {
        data[1].forEach((item1) => {
            data[2].forEach((item2) => {
                data[3].forEach((item3) => {
                    data[4].forEach((item4) => {
                        list.push([item0, item1, item2, item3, item4]);
                    });
                });
            });
        });
    });
    let arr = []
    list.forEach((item) => {
        arr.push(this.calculateDouble2(
            klineData,
            item[0],
            item[1],
            item[2],
            item[3],
            item[4]
        ))
    });
    self.postMessage(arr);
}, false);

function calculateDouble2(
    klineData,
    assetsAll = 100,
    assetsSplit = 5,
    assetsScale = 1.2,
    riseKey = 0.005,
    gas = 0.002
) {
    assetsSplit = parseFloat(assetsSplit);
    assetsScale = parseFloat(assetsScale);
    riseKey = parseFloat(riseKey);
    gas = parseFloat(gas);

    let info = {
        buyCount: 0,
        sellCount: 0,
        buyError: 0,
        sellError: 0,
        assets: parseFloat(assetsAll),
        assetsNum0: assetsAll / klineData[0].list[0].close,
        assetsNum1: assetsAll / klineData[1].list[0].close,
    };

    klineData[0].list.forEach((item, index) => {
        let item0 = klineData[0].list[index];
        let item1 = klineData[1].list[index];
        this.calculateDouble3(
            item0,
            "assetsNum0",
            info,
            assetsAll,
            assetsSplit,
            assetsScale,
            riseKey,
            gas
        );
        this.calculateDouble3(
            item1,
            "assetsNum1",
            info,
            assetsAll,
            assetsSplit,
            assetsScale,
            riseKey,
            gas
        );
    });
    let data = {
        currency: klineData[0].currency + "," + klineData[1].currency,
        period: klineData[0].period,
        length: klineData[0].list.length,
        assets0: _N(
            info.assetsNum0 *
            klineData[0].list[klineData[0].list.length - 1].close,
            2
        ),
        assets1: _N(
            info.assetsNum1 *
            klineData[1].list[klineData[1].list.length - 1].close,
            2
        ),
        assetsAll,
        assetsSplit,
        assetsScale,
        riseKey,
        gas,
        ...info,
        time: new Date().getTime(),
        assets: _N(info.assets, 2),
    };
    data.change = _N(
        data.assets + data.assets0 + data.assets1 - 3 * assetsAll,
        2
    );
    data.rate = (data.change / parseFloat(assetsAll)) * 3;
    return data;
}
function calculateDouble3(
    item,
    assetsNumkey,
    info,
    assetsAll,
    assetsSplit,
    assetsScale,
    riseKey,
    gas
) {
    let assetsSplitMax = assetsSplit * assetsScale;

    let balance2usdt = info[assetsNumkey] * item.close;

    let rise = (item.close - item.open) / item.open;
    if (Math.abs(rise) > parseFloat(riseKey)) {
        if (rise > 0) {
            // 卖出
            let assetsSplitS =
                balance2usdt > info.assets ? assetsSplitMax : assetsSplit;
            let num = parseFloat(assetsSplitS) / item.close;
            if (info[assetsNumkey] > num) {
                info.assets += parseFloat(assetsSplitS) * (1 - parseFloat(gas));
                info[assetsNumkey] -= parseFloat(assetsSplitS) / item.close;
                info.sellCount++;
            } else {
                info.sellError++;
            }
        } else {
            // 买入
            let assetsSplitS =
                balance2usdt > info.assets ? assetsSplit : assetsSplitMax;
            if (info.assets > assetsSplitS) {
                info.assets -= assetsSplitS;
                info[assetsNumkey] +=
                    (assetsSplitS / item.close) * (1 - parseFloat(gas));
                info.buyCount++;
            } else {
                info.buyError++;
            }
        }
    }
}

function _D(time) {
    return require("dayjs")(time).format("YYYY-MM-DD HH:mm:ss");
}

function _N(time, num = 0) {
    return Math.floor(time * Math.pow(10, num)) / Math.pow(10, num);
}

function _Round(time, num = 0) {
    return Math.round(time * Math.pow(10, num)) / Math.pow(10, num);
}