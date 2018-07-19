//-------------------------
// ボタンクリックイベント
//-------------------------

function pdfOpen() {

  //変数
  var companyname = document.getElementById('companyname').value,
  issue = document.getElementById('issue').value,
  request = document.getElementById('request').value,
  building = document.getElementById('building').value,
  place = document.getElementById('place').value,
  telephone = document.getElementById('telephone').value,
  fa = document.getElementById('fa').value,
  happen = document.getElementById('happen').value,
  emergency = document.getElementById('emergency').value,
  construction = document.getElementById('construction').value,
  booked = document.getElementById('booked').value,
  info = document.getElementById('info').value;

  // フォント
  pdfMake.fonts = {
    GenShin: {
      normal:      'GenShinGothic-Normal-Sub.ttf',
      bold:        'GenShinGothic-Normal-Sub.ttf',
      italics:     'GenShinGothic-Normal-Sub.ttf',
      bolditalics: 'GenShinGothic-Normal-Sub.ttf'
    }
  }

  //-------------------------
  // JSONで表記したPDFの内容
  //-------------------------
  var dd = {
  	content: [
  		{
  			text: '作業依頼書',
  			style: 'header'
  		},
  		{
  			text: '株式会社'+ companyname +'      御中',
  			style: 'subheader'
  		},
      {
        text: 'いつもお世話になっております。\n下記作業のご手配よろしくお願いいたします。',
        style: 'lefttext'
      },
      {
        text: '株式会社OOO\n〒123-4567 東京都品川区xx町5-7-3\nTEL: 030-1234-5678\nTEX:030-4567-8901',
        style: 'righttext'
      },
  		'依頼内容',
      {
  			style: 'tableExample',
  			table: {
  				widths: [80, 160, 80, 160],
  				heights: 'auto',
  				// keepWithHeaderRows: 1,
  				body: [
  					['件名', {colSpan: 3, text: issue}, '', ''],
  					['作業依頼者', {colSpan: 3, text: request}, '', ''],
  					['物件名', {colSpan: 3, text: building}, '', ''],
  					['住所', {colSpan: 3, text: place}, '', ''],
  					['電話番号', telephone, 'FAX', fa],
  					['発生日', happen, '緊急度', emergency],
  					['施工日', construction, '指定期間', booked],
  				]
  			}
  		},
  		'用件詳細',
  		{
        style: 'tableExample',
  			table: {
  				widths: [250, 247],
  				heights: [150, 150],
  				body: [
  					[{rowSpan: 2, colSpan: 2, text: info, style: 'answer'}, ''],
  					[''],
  				]
  			}
      },
  		'<注意事項>\n※作業前後に、当社担当者まで状況報告をお願いします。\n※作業前後の写真を撮影し、担当者まで送付してください。',
  	],
  	styles: {
  		header: {
  			fontSize: 20,
  			bold: true,
  		},
  		subheader: {
  			fontSize: 16,
  			bold: true,
  			margin: [0, 10, 0, 10],
  		},
  		tableExample: {
  			alignment: 'center',
  			margin: [0, 5, 0, 15],
  		},
      answer: {
        alignment: 'left',
      },
  		lefttext: {
  			alignment: 'left',
  		},
  		righttext: {
  			alignment: 'right',
  		},
  		defaultStyle: {
  		// alignment: 'justify'
  	}
  	}

  }


  // ディフォルトフォントを指定
  if (!dd['defaultStyle']) {
    dd['defaultStyle'] = new Object();
  }
  dd['defaultStyle']['font'] = 'GenShin';


  // ブラウザ名を取得
  var name = getBrowser();
  // ブラウザことに処理を分岐
  // IEの場合
  if (name == 'ie') {
    pdfMake.createPdf(dd).download('optionalName.pdf');
  // IE以外
  } else {
    pdfMake.createPdf(dd).open();
  }
}

//-------------------------
// ブラウザを判定する関数
//-------------------------
var getBrowser = function() {

  var name = 'unknown';
  // ユーザーエージェントを取得
  var ua = window.navigator.userAgent.toLowerCase();
  // ieをチェック
  if (ua.indexOf("msie") != -1 ||
      ua.indexOf('edge') != -1 ||
      ua.indexOf('trident/7') != -1) {
    name = 'ie';
  // ie以外
  } else if (ua.indexOf('chrome') != -1) {
    name = 'chrome';
  } else if (ua.indexOf('safari') != -1) {
    name = 'safari';
  } else if (ua.indexOf('opera') != -1) {
    name = 'opera';
  } else if (ua.indexOf('firefox') != -1) {
        name = 'firefox';
  }
  return name;
}
