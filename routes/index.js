var express = require('express');
var router = express.Router();
var validate = require('../public/javascripts/validate');
var clone = require('../public/javascripts/clone');

/* GET home page. */
router.get('/', function(req, res) {
    req.session.table = {
        'avai': {
            '0': 3,
            '1': 3,
            '2': 2
        },
        '0': {
            '0': {
                '0': 7,
                '1': 5,
                '2': 3
            },
            '1': {
                '0': 0,
                '1': 1,
                '2': 0
            },
            '2': {
                '0': 7,
                '1': 4,
                '2': 3
            }
        },
        '1': {
            '0': {
                '0': 3,
                '1': 2,
                '2': 2
            },
            '1': {
                '0': 2,
                '1': 0,
                '2': 0
            },
            '2': {
                '0': 1,
                '1': 2,
                '2': 2
            }
        },
        '2': {
            '0': {
                '0': 9,
                '1': 0,
                '2': 2
            },
            '1': {
                '0': 3,
                '1': 0,
                '2': 2
            },
            '2': {
                '0': 6,
                '1': 0,
                '2': 0
            }
        },
        '3': {
            '0': {
                '0': 2,
                '1': 2,
                '2': 2
            },
            '1': {
                '0': 2,
                '1': 1,
                '2': 1
            },
            '2': {
                '0': 0,
                '1': 1,
                '2': 1
            }
        },
        '4': {
            '0': {
                '0': 4,
                '1': 3,
                '2': 3
            },
            '1': {
                '0': 0,
                '1': 0,
                '2': 2
            },
            '2': {
                '0': 4,
                '1': 3,
                '2': 1
            }
        }
    };
    req.session.requ = {
        '0': 1,
        '1': 0,
        '2': 2,
        '3': 1
    };
    var lenOfP = 0;
    for (var arr in req.session.table) {
        lenOfP++;
    }
    lenOfP--;
    res.render('index', {
        title: '银行家算法',
        table: req.session.table,
        lenOfP: lenOfP
    });
});

//验证系统安全性,寻找安全序列
router.post('/validate', function(req, res) {
    var _body = req.body;
    req.session.table = clone(_body);

    var passed = [];
    var len = 0;

    for (var arr in _body) {
        len++;
    }
    len--;
    passed = validate(_body);
    if (passed.length === len) {
        res.render('index', {
            title: '银行家算法',
            succeed: true,
            passed: passed,
            requ: req.session.requ,
            table: req.session.table,
            lenOfP: len
        });
    } else {
        res.render('index', {
            title: '银行家算法',
            succeed: false,
            passed: passed,
            requ: req.session.requ,
            table: req.session.table,
            lenOfP: len
        });
    }
});

//发送请求向量
router.post('/sendReq', function(req, res) {
    var passed = [];
    var _requ = req.body.requ;
    var _table = clone(req.session.table);
    var __table;
    var vali = false;
    var len = 0;
    for (var arr in req.session.table) {
        len++;
    }
    len--;
    if (parseInt(_requ[3]) >= len) {
        return res.render('index', {
            title: '银行家算法',
            succeed: true,
            vali: vali,
            requ: req.session.requ,
            table: req.session.table,
            lenOfP: len
        });
    }
    if (req.session.table[_requ[3].toString()][2][0] >= _requ[0] && req.session.table[_requ[3].toString()][2][1] >= _requ[1] && req.session.table[_requ[3].toString()][2][2] >= _requ[2]) {
    } else {
        return res.render('index', {
            title: '银行家算法',
            succeed: true,
            vali: vali,
            requ: req.session.requ,
            table: req.session.table,
            lenOfP: len
        });
    }
    if (req.session.table.avai[0] >= _requ[0] && req.session.table.avai[1] >= _requ[1] && req.session.table.avai[2] >= _requ[2]) {
    } else {
        return res.render('index', {
            title: '银行家算法',
            succeed: true,
            vali: vali,
            requ: req.session.requ,
            table: req.session.table,
            lenOfP: len
        });
    }

    _table.avai[0] = (parseInt(_table.avai[0]) - parseInt(_requ[0])).toString();
    _table.avai[1] = (parseInt(_table.avai[1]) - parseInt(_requ[1])).toString();
    _table.avai[2] = (parseInt(_table.avai[2]) - parseInt(_requ[2])).toString();
    _table[_requ[3].toString()][2][0] = (parseInt(_table[_requ[3].toString()][2][0]) - parseInt(_requ[0])).toString();
    _table[_requ[3].toString()][2][1] = (parseInt(_table[_requ[3].toString()][2][1]) - parseInt(_requ[1])).toString();
    _table[_requ[3].toString()][2][2] = (parseInt(_table[_requ[3].toString()][2][2]) - parseInt(_requ[2])).toString();
    _table[_requ[3].toString()][1][0] = (parseInt(_table[_requ[3].toString()][1][0]) + parseInt(_requ[0])).toString();
    _table[_requ[3].toString()][1][1] = (parseInt(_table[_requ[3].toString()][1][1]) + parseInt(_requ[1])).toString();
    _table[_requ[3].toString()][1][2] = (parseInt(_table[_requ[3].toString()][1][2]) + parseInt(_requ[2])).toString();

    __table = clone(_table);
    passed = validate(_table);

    if (passed.length === len) {
        req.session.table = __table;
        req.session.requ = _requ;
        res.render('index', {
            title: '银行家算法',
            succeed: true,
            finish: true,
            vali: vali,
            passed: passed,
            requ: req.session.requ,
            table: req.session.table,
            lenOfP: len
        });
    } else {
        res.render('index', {
            title: '银行家算法',
            succeed: true,
            finish: false,
            vali: vali,
            passed: passed,
            requ: req.session.requ,
            table: req.session.table,
            lenOfP: len
        });
    }
});
module.exports = router;