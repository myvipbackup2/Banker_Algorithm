function validate(data) {
    console.log(data);
    var passed = [];
    var len = 0;
    for (var arr in data) {
        len++;
    }
    len--;
    console.log("len in vali: " + len);
    check(data, passed, len);
    console.log("check finished!");
    console.log("final passed " + passed);
    return passed;
};

function check(data, passed, len) {
    var _dataLength = 0;
    for (var arr in data) {
        _dataLength++;
    }
    if (_dataLength - 1 > 0) {
        for (var i = 0; i < len; i++) {
            if (data[i] !== undefined) {
                if (data.avai[0] >= data[i][2][0] && data.avai[1] >= data[i][2][1] && data.avai[2] >= data[i][2][2]) {
                    console.log("data.p" + i + " is matched");
                    data.avai[0] = parseInt(data.avai[0]) + parseInt(data[i][1][0]);
                    data.avai[1] = parseInt(data.avai[1]) + parseInt(data[i][1][1]);
                    data.avai[2] = parseInt(data.avai[2]) + parseInt(data[i][1][2]);
                    console.log('avai now: ' + data.avai);
                    passed.push(i);
                    console.log("passed now : " + passed);
                    delete data[i];
                    check(data, passed, len);
                }
            }
        }
    } else {
        console.log("end!");
    }
};

module.exports = validate;