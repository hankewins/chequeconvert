import { Component } from '@angular/core';

function num2cn(num: any, lang: string){
  var chars = {}, units = {};
  var str = '', arr, dot = 0, matchs = [], maxLen = 16;
  var l2d: any = '', r2d: any = '', l2n: any = '', r2n: any = '';

  chars['zh'] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  chars['tw'] = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];
  units['zh'] = ['', '', '十', '百', '千', '万', '亿'];
  units['tw'] = ['', '', '拾', '佰', '仟', '萬', '億'];
  if (!num || num <= 0) return chars[lang][0];
  num = (num + '').indexOf('.') > -1 ? num + '00' : num + '.00';
  dot = (num + '').indexOf('.');
  l2n = dot > -1 ? num.substr(0, dot) : num; // 左边字符串数字
  r2n = dot > -1 ? num.substr(dot+1, 2) : '0'; // 左边字符串数字
  r2n = r2n >= '10' ? r2n : '0' + parseInt(r2n);
  if(l2n.length > maxLen) return  lang == 'zh' ? '中文货币转换超出最大值' : '中文貨幣轉換超出最大值';
  l2d += l2n != 0 ? _int2cn(l2n, chars[lang], units[lang]) + '元' : '';
  r2d += r2n != 0 ? chars[lang][r2n[0]] + '角' + chars[lang][r2n[1]] + '分' : (lang == 'zh' ? '整' : '正');
  return l2d + r2d;
}

function _int2cn(l2n, chars, units){
  var result = '', p1, p2, p3, p4, matchs = ('000000000000000000000'+l2n).match(/(\d{4})(\d{4})(\d{4})(\d{4})$/), count = 0;
  // 消除前置0
  p1 = matchs[1].replace(/^[0]+/,''), p2 = matchs[2].replace(/^[0]+/,''), p3 = matchs[3].replace(/^[0]+/,''), p4 = matchs[4].replace(/^[0]+/,'');
  // result += p1[0] != 0 ? chars[p1[0]] + units[4] : units[0]; // 仟
  // result += p1[1] != 0 ? chars[p1[1]] + units[3] : units[0]; // 佰
  // result += p1[2] != 0 ? chars[p1[2]] + units[2] : units[0]; // 拾
  // result += p1[3] != 0 ? chars[p1[3]] + units[5] : units[0]; // 兆

  // result += p2[0] != 0 ? chars[p2[0]] + units[4] : units[0]; // 仟
  // result += p2[1] != 0 ? chars[p2[1]] + units[3] : units[0]; // 佰
  // result += p2[2] != 0 ? chars[p2[2]] + units[2] : units[0]; // 拾
  // result += p2[3] != 0 ? chars[p2[3]] + units[6] : units[0]; // 亿

  // result += p3[0] != 0 ? chars[p3[0]] + units[4] : units[0]; // 仟
  // result += p3[1] != 0 ? chars[p3[1]] + units[3] : units[0]; // 佰
  // result += p3[2] != 0 ? chars[p3[2]] + units[2] : units[0]; // 拾
  // result += p3[3] != 0 ? chars[p3[3]] + units[5] : units[0]; // 萬

  // result += p4[0] != 0 ? chars[p4[0]] + units[4] : units[0]; // 仟
  // result += p4[1] != 0 ? chars[p4[1]] + units[3] : units[0]; // 佰
  // result += p4[2] != 0 ? chars[p4[2]] + units[2] : units[0]; // 拾
  // result += p4[3] != 0 ? chars[p4[3]] + units[1] : units[0]; // 元

  result += _int2next(p1, chars, units, units[5]); // 兆
  result += _int2next(p2, chars, units, units[6]); // 亿
  result += _int2next(p3, chars, units, units[5]); // 萬
  result += _int2next(p4, chars, units, units[0]); // 仟以内

  return result;
}

function _int2next(match, chars, units, separate){
  var result = '', len = match.length;
  for(var i = 0; i < len; i++){
    result +=  match[i] == 0 || len - i == 0 ? '' : chars[match[i]] + units[len-i];
    if(match.substr(i, len) % Math.pow(10, len - 1) == 0) break;
    result += (match[1] == 0 && match[2] != 0) && i == 1 && len == 4 ? chars[0] : '';
    result += (match[1] != 0 && match[3] != 0 && match[2] == 0) && i == 1 && len == 4 ? chars[0] : '';
    result += (match[1] == 0 && match[2] == 0) && i == 2 && len == 4 ? chars[0] : '';
    result += (match[1] == 0) && i == 1 && len == 3 ? chars[0] : '';
  }
  result += match > 0 ? separate : '';
  return result;
}

function num2en(num: any){
  var l2w = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  var h2w = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
  var units = ['Cents ', 'Dollars '];
  var str = '', arr, dot = 0;
  var l2d: any = '', r2d: any = '', l2n: any = '', r2n: any = '';

  if (!!num == false || num <= 0) return 'Zero Dollars Only';
  num = (num + '').indexOf('.') > -1 ? num + '00' : num + '.00';
  dot = (num + '').indexOf('.');
  l2n = dot > -1 ? num.substr(0, dot) : num; // 左边字符串数字
  r2n = dot > -1 ? num.substr(dot+1, 2) : '0'; // 左边字符串数字
  r2n = r2n >= '10' ? r2n : '0' + parseInt(r2n);
  l2d = getUnitStr(l2n, l2w, h2w, units) + (r2n != 0 ? units[1] : units[1] + 'Only');
  r2d += r2n != 0 ? 'and ' : '';
  r2d += (r2n[0] + r2n[1]) > 19 && (r2n[0] + r2n[1]) % 10 != 0 ? h2w[r2n[0]] + '-' + l2w[r2n[1]] : '';
  r2d += (r2n[0] + r2n[1]) > 19 && (r2n[0] + r2n[1]) % 10 == 0 ? h2w[r2n[0]] + l2w[r2n[1]] + ' ': '';
  r2d += (r2n[0] + r2n[1]) <= 19 && (r2n[0] + r2n[1]) > 0 ? l2w[+(r2n[0] + r2n[1])] : '';
  r2d += r2d != '' ? units[0] + 'Only' : '';
  return l2d + r2d;
}

function getUnitStr(str, l2w, h2w, units){
  var result = '', matchs = ('000000000000000000000'+str).match(/(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})$/);
  result += _parseUnitStr(matchs, matchs[1], l2w, h2w, 1);
  result += _parseUnitStr(matchs, matchs[2], l2w, h2w, 2);
  result += _parseUnitStr(matchs, matchs[3], l2w, h2w, 3);
  result += _parseUnitStr(matchs, matchs[4], l2w, h2w, 4);
  result += _parseUnitStr(matchs, matchs[5], l2w, h2w, 5);
  result += _parseUnitStr(matchs, matchs[6], l2w, h2w, 6);
  result += _parseUnitStr(matchs, matchs[7], l2w, h2w, 7);
  result = result.substr(-2) == ', ' ? result.substr(0, result.length-2) + ' ' : result;
  return result || 'Zero ';
}

function _parseUnitStr(matchs, str, l2w, h2w, part){
  //Quintillion 10的18次方 Quadrillion 10的15次方
  var result = '', units = ['', 'Quintillion, ', 'Quadrillion, ', 'Trillion, ', 'Billion, ', 'Million, ', 'Thousand, ', ''];
  if(str > 0 && str % 100 == 0){
    result += l2w[str[0]] + 'Hundred ';
  } else if(str > 0 && str < 10 && part <= 5) {
    result += l2w[Number(str)];
  } else {
    result += str[0] != 0 ? l2w[str[0]] + 'Hundred and ' : '';
    result += (str[1] + str[2]) > 19 && (str[1] + str[2]) % 10 != 0 ? h2w[str[1]] + '-' + l2w[str[2]] : '';
    result += (str[1] + str[2]) > 19 && (str[1] + str[2]) % 10 == 0 ? h2w[str[1]] + l2w[str[2]] + ' ': '';
    result += (str[1] + str[2]) <= 19 && (str[1] + str[2]) > 0 ? l2w[+(str[1] + str[2])] : '';
  }
  if(matchs[7] <= 99 && part <= 6){
    result += str > 0 ? units[part].substr(0, units[part].length-2) + ' and ' : '';
  } else {
    result += str > 0 ? units[part] : '';
  }
  return result;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '支票中文英文大写金额转换器';
  zh_cheque: any = '';
  tw_cheque: any = '';
  en_cheque: any = '';

  onInputEvent(event: any) {
    this.zh_cheque = num2cn(event.target.value || 0, 'zh');
    this.tw_cheque = num2cn(event.target.value || 0, 'tw');
    this.en_cheque = num2en(event.target.value || 0);
  }
}
