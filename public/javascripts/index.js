$(function() {
        $(".del").click(function(e) {
            e.preventDefault();
            var btn = $(e.target);
            var tr = btn.parent().parent();
            tr.remove();
            var names = $(".name");
            for (var i = 1; i <= names.length; i++) {
                var pos = i - 1;
                names[pos].innerText = "P" + i;
                names[pos].nextSibling.firstChild.firstChild.firstChild.setAttribute('name', "[" + i + "]" + "[0][0]");
                names[pos].nextSibling.firstChild.firstChild.nextSibling.firstChild.setAttribute('name', "[" + i + "]" + "[0][1]");
                names[pos].nextSibling.firstChild.firstChild.nextSibling.nextSibling.firstChild.setAttribute('name', "[" + i + "]" + "[0][2]");
                names[pos].nextSibling.nextSibling.firstChild.firstChild.firstChild.setAttribute('name', "[" + i + "]" + "[1][0]");
                names[pos].nextSibling.nextSibling.firstChild.firstChild.nextSibling.firstChild.setAttribute('name', "[" + i + "]" + "[1][1]");
                names[pos].nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling.firstChild.setAttribute('name', "[" + i + "]" + "[1][2]");
                names[pos].nextSibling.nextSibling.nextSibling.firstChild.firstChild.firstChild.setAttribute('name', "[" + i + "]" + "[2][0]");
                names[pos].nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.firstChild.setAttribute('name', "[" + i + "]" + "[2][1]");
                names[pos].nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling.firstChild.setAttribute('name', "[" + i + "]" + "[2][2]");
            }
        });
        $(".add").click(function(e) {
            e.preventDefault();
            var lenNow = $(".name").length + 1;
            $(".avai").attr("rowspan", function() {
                this.rowSpan++;
                return this.rowSpan;
            });
            $("tbody").append('<tr><td class="name">P' + lenNow + '</td><td><div class="row row0"><div class="col-xs-4"><input type="text" name="[' + lenNow + '][0][0]" value="0" class="form-control max col0"></div><div class="col-xs-4"><input type="text" name="[' + lenNow + '][0][1]" value="0" class="col1 max form-control"></div><div class="col-xs-4"><input type="text" name="[' + lenNow + '][0][2]" value="0" class="form-control max col2"></div></div></td><td><div class="row row1"><div class="col-xs-4"><input type="text" name="[' + lenNow + '][1][0]" value="0" class="form-control col0"></div><div class="col-xs-4"><input type="text" name="[' + lenNow + '][1][1]" value="0" class="form-control col1"></div><div class="col-xs-4"><input type="text" name="[' + lenNow + '][1][2]" value="0" class="form-control col2"></div></div></td><td><div class="row row2"><div class="col-xs-4"><input type="text" name="[' + lenNow + '][2][0]" value="0" class="form-control col0"></div><div class="col-xs-4"><input type="text" name="[' + lenNow + '][2][1]" value="0" class="form-control col1"></div><div class="col-xs-4"><input type="text" name="[' + lenNow + '][2][2]" value="0" class="form-control col2"></div></div></td><td><button disabled="disabled" class="btn-danger btn">false</button></td><td><button class="btn-danger btn del">delete</button></td></tr>');
            validate();
        });

        //检查输入的数符合要求
        function validate() {
            var valueBefore;
            $("input").focus(function(e) {
                var input = $(e.target);
                valueBefore = input.val();
            });
            $("input").blur(function(e) {
                    var input = $(e.target);
                    var valueAfter = input.val();
                    var patten = new RegExp(/^[0-9]+$/);

                    
                    if ($(this).hasClass("max")) {
                        alert("max列为自动计算（Allocation+Need）所得，所以不能修改max列");
                        input.attr("value", valueBefore);
                        input.val(valueBefore);
                        return;
                    } 
                    else if (patten.test(valueAfter) !== true || valueAfter < 0 || valueAfter > 99 || valueAfter.length > 2) {
                        alert("输入的数需要是一个小于100的两位正整数！");
                        input.attr("value", valueBefore);
                        input.val(valueBefore);
                        return;
                    } else if (valueAfter[0] == 0 && valueAfter.length >= 2) {
                        valueAfter = valueAfter.slice(1, 2);
                        input.attr("value", valueAfter);
                        input.val(valueAfter);
                    }
                    else if (!$(this).hasClass("avai")) {
                        if ($(this).hasClass('col0')) {
                            var tr = $(this).parent().parent().parent().parent();
                            max_fix(0, tr);
                        }
                        if ($(this).hasClass('col1')) {
                            var tr = $(this).parent().parent().parent().parent();
                            max_fix(1, tr);
                        }
                        if ($(this).hasClass('col2')) {
                            var tr = $(this).parent().parent().parent().parent();
                            max_fix(2, tr);
                        }
                    }

                    function max_fix(pos, tr) {
                        var str1 = '.row0' + ' .col' + pos;
                        var str2 = '.row1' + ' .col' + pos;
                        var str3 = '.row2' + ' .col' + pos;
                        var max = tr.find(str1);
                        var allocation = tr.find(str2);
                        var need = tr.find(str3);
                        max.val(parseInt(allocation.val()) + parseInt(need.val()));
                    }
            });
        }
        validate();
});