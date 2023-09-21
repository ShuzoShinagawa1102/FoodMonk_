// get maplist
const maplist = new Array()
const maplistUl = document.getElementById("mapList")
let maplistLi = document.querySelectorAll("#mapList li")

// get map data
const mapCanvas = document.getElementById("map_canvas")
let currentWindow = null
let cnt = 0
const defaultIconUrl = "core/images/food_available.png"
const currentIconUrl = 'core/images/food_available_big.png'
// const defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png"
// const currentIconUrl = 'https://icooon-mono.com/i/icon_11160/icon_111601_48.png'
const defaultScaledSize = new google.maps.Size(30, 30)
const currentScaledSize = new google.maps.Size(40, 40)

// Google Mapsのスタイルを定義
const mapStyles = [
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#fdfdfd"
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "gamma": 7.18
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "saturation": "-35"
          },
          {
              "lightness": "-95"
          },
          {
              "gamma": "0.00"
          },
          {
              "weight": "0.01"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
          {
              "color": "#ffb900"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
          {
              "gamma": 0.48
          }
      ]
  },
  {
      "featureType": "transit.station",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit.station.rail",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "color": "#ff0000"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#4d4946"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#33435a"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  }
];

                                     
//　LocationのJSONデータの取得

class GetData {
  
  async getLocation() {
    try {
      const location = 
      {
        "items": [
          {
            "fields": {
              "id": "1",
              "shop_name": "西友新北習志野店",
              "latitude": 35.7235532,
              "longitude": 140.0410907,
              "phone": "047-463-1221",
              "address": "千葉県船橋市習志野台１丁目３５−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://chiba.itot.jp/kita-narashino/wp-content/uploads/2022/04/313168_22-1_kitanarashino.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "2",
              "shop_name": "西友北習志野店",
              "latitude": 35.7227256,
              "longitude": 140.0446264,
              "phone": "047-466-1131",
              "address": "千葉県船橋市習志野台２丁目４９−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://www.seiyu.co.jp/assets/images/kitanarashino_0722.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "3",
              "shop_name": "マルエツ習志野店",
              "latitude": 35.7153522,
              "longitude": 140.0436994,
              "phone": "047-462-1321",
              "address": "千葉県船橋市習志野台４丁目２−１３",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/3/4/9/00000000000000140943/0000000250/00000000000000140943_0000000250_4.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "4",
              "shop_name": "ビッグ・エー船橋習志野台店",
              "latitude": 35.7161745,
              "longitude": 140.0463197,
              "phone": "047-468-3018",
              "address": "千葉県船橋市習志野台４丁目４６−１４",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://cdn.img-asp.jp/spot/3200267_1_2500_2700_3.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "5",
              "shop_name": "渡辺ストアー",
              "latitude": 35.7146535,
              "longitude": 140.0436881,
              "phone": "047-464-3312",
              "address": "千葉県船橋市薬円台５丁目３２−８",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://fastly.4sqi.net/img/general/200x200/gF_32nKNk5ZQWPy32UhOstkJ1FCWWUeBZyk3oxluG-8.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "6",
              "shop_name": "ヨークマート習志野台店",
              "latitude": 35.7191919,
              "longitude": 140.0504228,
              "phone": "047-467-1541",
              "address": "千葉県船橋市習志野台３丁目６−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/7/9/5/00000000000000141597/0000000898/00000000000000141597_0000000898_2.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "7",
              "shop_name": "イオン高根木戸店",
              "latitude": 35.7271013,
              "longitude": 140.03529,
              "phone": "047-464-7711",
              "address": "千葉県船橋市習志野台１丁目１−３",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://chiba.itot.jp/kita-narashino/wp-content/uploads/2022/04/313170_24-2_kitanarashino.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "8",
              "shop_name": "新鮮館魚次　習志野台６丁目店",
              "latitude": 35.7209327,
              "longitude": 140.0523241,
              "phone": "047-404-9880",
              "address": "千葉県船橋市習志野台６丁目２５−２１",
              "category": "supermarket",
              "image": {
                "fields": {
                 
                  "file": {
                    "url": "https://myfuna.net/wp-content/uploads/2018/04/UOTSUGU04.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "9",
              "shop_name": "西友薬円台店",
              "latitude": 35.7129553,
              "longitude": 140.0374014,
              "phone": "047-466-2433",
              "address": "千葉県船橋市薬円台６丁目６−７",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                      "url": "https://funabashi.goguynet.jp/wp-content/uploads/sites/56/2021/09/BA27B20C-93A0-444B-A7F5-69B077631D9C.jpeg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "10",
              "shop_name": "ビッグ・エー船橋高根台店",
              "latitude": 35.7317579,
              "longitude": 140.040863,
              "phone": "047-461-8874",
              "address": "千葉県船橋市高根台３丁目３−４ 高根台東ＳＣ",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://itot.jp/p12/wp-content/uploads/2019/10/274815_28-01kitanarashino.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "11",
              "shop_name": "マックスバリュ習志野台店",
              "latitude": 35.7169234,
              "longitude": 140.0542626,
              "phone": "047-466-6101",
              "address": "千葉県船橋市習志野台５丁目３９−４",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/1/1/3/00000000000000141311/0000019103/00000000000000141311_0000019103_1.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "12",
              "shop_name": "ミニコープ松が丘店",
              "latitude": 35.7323946,
              "longitude": 140.0463949,
              "phone": "047-467-6668",
              "address": "千葉県船橋市松が丘４丁目２４−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://map.coopdeli.coop/img/2/shop_pic_24000243.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "13",
              "shop_name": "コープ薬円台店",
              "latitude": 35.7098209,
              "longitude": 140.0400585,
              "phone": "047-496-2440",
              "address": "千葉県船橋市薬円台５丁目１９−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://map.coopdeli.coop/img/2/shop_pic_24000209.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "14",
              "shop_name": "リブレ京成高根台店",
              "latitude": 35.730106,
              "longitude": 140.0309665,
              "phone": "047-466-3151",
              "address": "千葉県船橋市高根台１丁目２−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://epoca-t.jp/wp/wp-content/uploads/2021/10/livrekeisei.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "15",
              "shop_name": "エコ・ピア本部事務所",
              "latitude": 35.7090976,
              "longitude": 140.0380665,
              "phone": "047-463-1110",
              "address": "千葉県船橋市薬円台５丁目２−５",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://assets.st-note.com/production/uploads/images/73925678/af8f4753371ca846d6d5b8126d25bfa3.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "16",
              "shop_name": "フードスクエアカスミ高根台店",
              "latitude": 35.7311869,
              "longitude": 140.0320369,
              "phone": "047-496-5581",
              "address": "千葉県船橋市高根台１丁目",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://www.kasumi.co.jp/wp-content/uploads/2021/05/8c16292bd9aff0f4d2d18a87d4f6ebb4.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "17",
              "shop_name": "マルエツ高根台店",
              "latitude": 35.7355169,
              "longitude": 140.0406986,
              "phone": "047-462-8051",
              "address": "千葉県船橋市松が丘１丁目３２−１５ マルエツ高根台店",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/1/4/9/00000000000000140941/0000001271/00000000000000140941_0000001271_4.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "18",
              "shop_name": "ビッグ・エー船橋松が丘店",
              "latitude": 35.7355319,
              "longitude": 140.0490869,
              "phone": "047-461-6613",
              "address": "千葉県船橋市松が丘３丁目４８−２８",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic2.homemate-research.com/pubuser1/pubuser_facility_img/6/8/6/00000000000000144686/0000052631/00000000000000144686_0000052631_5.jpg"
                }
              }
            }
          }
          },
          {
            "fields": {
              "id": "19",
              "shop_name": "マミーマート船橋日大前店",
              "latitude": 35.7264112,
              "longitude": 140.0609233,
              "phone": "047-496-0811",
              "address": "千葉県船橋市坪井東３丁目６−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://spacelab-system.jp/upload/facility/15364/1/AE%E3%83%9E%E3%83%9F%E3%83%BC%E3%83%9E%E3%83%BC%E3%83%88%E8%88%B9%E6%A9%8B%E6%97%A5%E5%A4%A7%E5%89%8D%E5%BA%971.JPG"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "20",
              "shop_name": "新鮮市場マルエイ薬円台店",
              "latitude": 35.701082,
              "longitude": 140.5090968,
              "phone": "047-490-1212",
              "address": "千葉県船橋市新７３",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://www.maruei.info/img/thumb/shop11.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "21",
              "shop_name": "ビッグ・エー船橋田喜野井店",
              "latitude": 35.7051036,
              "longitude": 140.0480359,
              "phone": "047-402-1578",
              "address": "千葉県船橋市田喜野井７丁目１６−１０",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic4.homemate-research.com/pubuser1/pubuser_facility_img/7/8/6/00000000000000144687/0000000250/00000000000000144687_0000000250_1.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "22",
              "shop_name": "ミニコープ芝山店",
              "latitude": 35.7206384,
              "longitude": 140.0202181,
              "phone": "047-466-7272",
              "address": "千葉県船橋市芝山４丁目１−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic4.homemate-research.com/pubuser1/pubuser_facility_img/2/7/6/75000000000000039672/0000001153/75000000000000039672_0000001153_1.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "23",
              "shop_name": "マミーマート飯山満駅前店",
              "latitude": 35.7152731,
              "longitude": 140.0212808,
              "phone": "047-496-1210",
              "address": "千葉県船橋市芝山３丁目１２−５１ マミーマート飯山満駅前店内2F",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://spacelab-system.jp/upload/facility/15363/1/AE%E3%83%9E%E3%83%9F%E3%83%BC%E3%83%9E%E3%83%BC%E3%83%88%E9%A3%AF%E5%B1%B1%E6%BA%80%E9%A7%85%E5%89%8D%E5%BA%971.JPG"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "25",
              "shop_name": "リブレ京成高根グリーンハイツ店",
              "latitude": 35.728553,
              "longitude": 140.016838,
              "phone": "047-448-5407",
              "address": "千葉県船橋市緑台２丁目６−１３",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://cdn.img-asp.jp/spot/3560067_1_2500_2700_3.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "26",
              "shop_name": "マルエツ金杉店",
              "latitude": 35.7354099,
              "longitude": 140.018016,
              "phone": "047-449-6251",
              "address": "千葉県船橋市金杉７丁目５−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://jice.homemate-research.com/pubuser1/pubuser_facility_img/4/5/8/00000000000000140854/0000004143/00000000000000140854_0000004143_1.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "27",
              "shop_name": "トップマート津田沼店",
              "latitude": 35.6989054,
              "longitude": 140.0310453,
              "phone": "047-471-7112",
              "address": "千葉県船橋市三咲５丁目３３−３",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://cdn.img-asp.jp/spot/3300157_1_2500_2700_3.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "28",
              "shop_name": "ヤオコー八千代緑が丘店",
              "latitude": 35.7354362,
              "longitude": 140.0677838,
              "phone": "047-450-7811",
              "address": "千葉県船橋市緑が丘２丁目1番3",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://chiba.itot.jp/yachiyo-area/wp-content/uploads/2022/10/320934_yaoko_yachiyo_midorigaoka_30_03_800_533.JPG"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "29",
              "shop_name": "マルエツ東習志野店",
              "latitude": 35.7003651,
              "longitude": 140.0600929,
              "phone": "047-479-5793",
              "address": "千葉県船橋市習志野５丁目２−１",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic4.homemate-research.com/pubuser1/pubuser_facility_img/8/4/9/00000000000000140948/0000044730/00000000000000140948_0000044730_1.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "30",
              "shop_name": "ワイズマート飯山満店",
              "latitude": 35.705511,
              "longitude": 140.0171227,
              "phone": "047-464-3821",
              "address": "千葉県船橋市飯山満町２丁目４１０−３",
              "category": "supermarket",
              "image": {
                "fields": {
                  "file": {
                    "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/4/4/2/00000000000000142244/0000000376/00000000000000142244_0000000376_5.jpg"
                  }
                }
              }
            }
          },
          {
            "fields": {
              "id": "31",
              "shop_name": "ベルク八千代緑が丘店",
              "latitude": 35.7235964,
              "longitude": 140.0738319,
              "address": "千葉県八千代市大和田新田９９２−１",
              "phone": "047-480-4100",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://chiba.itot.jp/yachiyo/wp-content/uploads/2016/09/202679_24-01yachiyomidorigaoka.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "32",
              "shop_name": "イオン八千代緑が丘店",
              "latitude": 35.7279014,
              "longitude": 140.0730583,
              "address": "千葉県八千代市緑が丘２丁目１８５１",
              "phone": "047-458-5211",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://upload.wikimedia.org/wikipedia/commons/4/43/AEON_MALL_Yachiyo-Midorigaoka_01.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "33",
              "shop_name": "リブレ京成アルビス前原店",
              "latitude": 35.7010747,
              "longitude": 140.0217432,
              "address": "千葉県船橋市前原東２丁目２３−２３番１号",
              "phone": "047-403-6911",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://pic2.homemate-research.com/pubuser1/pubuser_facility_img/1/4/2/00000000000000142241/0000049035/00000000000000142241_0000049035_5.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "34",
              "shop_name": "まちの駅",
              "latitude": 35.7293434,
              "longitude": 140.0730791,
              "address": "千葉県八千代市緑が丘西４丁目２−８",
              "phone": "047-458-4129",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://chiba.itot.jp/yachiyo/wp-content/uploads/2016/09/202754_16-01yachiyomidorigaoka.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "35",
              "shop_name": "タイヨー八千代店",
              "latitude": 35.722736,
              "longitude": 140.0746915,
              "address": "千葉県船橋市習志野５丁目２−１",
              "phone": "047-489-5511",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://cdn.img-asp.jp/spot/6091570_1_2500_2700_3.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "36",
              "shop_name": "ヤオコー船橋三山店",
              "latitude": 35.6974649,
              "longitude": 140.0567458,
              "address": "千葉県八千代市緑が丘西２丁目１８５１",
              "phone": "047-455-7811",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://cdn.img-asp.jp/spot/3559761_1_2500_2700_3.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "37",
              "shop_name": "メガセンタートライアル八千代店",
              "latitude": 35.7336555,
              "longitude": 140.0725266,
              "address": "047-463-1110",
              "phone": "千葉県船橋市藤原7-46-1",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://pic2.homemate-research.com/pubuser1/pubuser_facility_img/6/9/3/00000000000000141396/0000048348/00000000000000141396_0000048348_1.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "38",
              "shop_name": "有限会社大野ストアー",
              "latitude": 35.7384964,
              "longitude": 140.0141168,
              "address": "千葉県船橋市三咲２丁目７−１２",
              "phone": "047-449-3770",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://funabashi-ichiba.jp/wp-content/uploads/2014/09/camera_20140916094018993-304x540.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "39",
              "shop_name": "ヤオコー船橋三咲店",
              "latitude": 35.7480595,
              "longitude": 140.0291343,
              "address": "千葉県習志野市東習志野６丁目７ 千葉県習志野市東習志野6-7-8 イオン東習志野ショッピングセンター1F",
              "phone": "047-440-3811",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://chiba.itot.jp/misaki/wp-content/uploads/2022/10/320062_yaoko_funabashimisakiten01_800_533.JPG" } } }
            }
          },
          {
            "fields": {
              "id": "40",
              "shop_name": "オーケー八千代緑が丘店",
              "latitude": 35.7300124,
              "longitude": 140.0755113,
              "address": "千葉県船橋市三山９丁目９−３１",
              "phone": "047-409-7035",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://ok-corporation.jp/archives/001/202007/c04acdb0b7b2ec2af5cd67373db05735.jpg" } } }
            }
          },
          {
            "fields": {
              "id": "41",
              "shop_name": "マックスバリュ東習志野店",
              "latitude": 35.6992771,
              "longitude": 140.0668404,
              "address": "千葉県習志野市大久保３丁目１２−１７",
              "phone": "047-455-6511",
              "category": "supermarket",
              "image": { "fields": { "file": { "url": "https://www.mv-kanto.co.jp/wp-content/uploads/2022/07/MV%E6%9D%B1%E7%BF%92%E5%BF%97%E9%87%8E%E5%BA%97.jpg" } }
            }
          }},
          {
                "fields": {
                  "id": "42",
                  "shop_name": "マルエツ船橋三山店",
                  "latitude": 35.6958087,
                  "longitude": 140.0617388,
                  "phone": "047-403-1120",
                  "address": "千葉県船橋市三咲５丁目３３−３",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://images.keizai.biz/funabashi_keizai/headline/1615461899_photo.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "43",
                  "shop_name": "ビッグ・エー習志野大久保店",
                  "latitude": 35.6912159,
                  "longitude": 140.0505258,
                  "phone": "047-470-3480",
                  "address": "千葉県習志野市藤崎２丁目９−２０ 三協コーポ",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://jice.homemate-research.com/pubuser1/pubuser_facility_img/0/8/6/00000000000000144680/0000022854/00000000000000144680_0000022854_1.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "44",
                  "shop_name": "リブレ京成三咲店",
                  "latitude": 35.7508663,
                  "longitude": 140.0286351,
                  "phone": "047-447-5886",
                  "address": "千葉県習志野市東習志野７丁目１−１４６",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://atari-kamafuna.com/wp-content/uploads/2019/05/IMG_1496.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "45",
                  "shop_name": "フレッシュワンたくぼ",
                  "latitude": 35.6897431,
                  "longitude": 140.0316511,
                  "phone": "047-471-2505",
                  "address": "千葉県習志野市津田沼１丁目２３−１ 店 ２Ｆ",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://res.cloudinary.com/ho27mjcou/image/upload/a862cbd4d4a74d8187b88dc44f3033.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "46",
                  "shop_name": "フードスクエアカスミ東習志野店",
                  "latitude": 35.6975189,
                  "longitude": 140.0697608,
                  "phone": "047-478-3721",
                  "address": "千葉県習志野市津田沼１丁目２３−１",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://www.kasumi.co.jp/wp-content/uploads/2021/05/d6b122151bafe9af52000043a35fa183.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "47",
                  "shop_name": "イオン津田沼ショッピングセンター",
                  "latitude": 35.6903076,
                  "longitude": 140.0250402,
                  "phone": "047-455-6000",
                  "address": "千葉県習志野市大久保１丁目１１−２０",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://town.mec-h.com/mh-tsudanuma/wp-content/uploads/2022/06/314937_22-6_tsudanuma.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "48",
                  "shop_name": "イオン津田沼店",
                  "latitude": 35.6903001,
                  "longitude": 140.0246839,
                  "phone": "047-455-6000",
                  "address": "千葉県習志野市津田沼１丁目１０−３０",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://upload.wikimedia.org/wikipedia/commons/8/88/AEON_Mall_Tsudanuma.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "49",
                  "shop_name": "マルエツ大久保駅前店",
                  "latitude": 35.6871588,
                  "longitude": 140.0458935,
                  "phone": "047-476-2111",
                  "address": "千葉県習志野市津田沼１丁目３ 習志野市津田沼１−３−１ ミーナ津田沼 4F",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "" } } }
                }
              },
              {
                "fields": {
                  "id": "50",
                  "shop_name": "イトーヨーカドー津田沼店",
                  "latitude": 35.6897707,
                  "longitude": 140.0238128,
                  "phone": "047-479-3111",
                  "address": "千葉県習志野市本大久保１丁目５−１４",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://pds.exblog.jp/pds/1/201511/27/27/c0236527_17395750.jpg" } } }
                }
              },
              {
                "fields": {
                  "id": "51",
                  "shop_name": "河内屋　津田沼店",
                  "latitude": 35.6897922,
                  "longitude": 140.0228855,
                  "phone": "047-476-6151",
                  "address": "千葉県習志野市薬円台２丁目９−３６",
                  "category": "supermarket",
                  "image": { "fields": { "file": { "url": "https://image3.homes.jp/smallimg/image.php?file=http%3A%2F%2Fimg.homes.jp%2Fyvh188drmruhroz.jpg" } } }
                }
              },
                  {
                    "fields": {
                      "id": "52",
                      "shop_name": "アコレ　本大久保１丁目店",
                      "latitude": 35.6861133,
                      "longitude": 140.0464055,
                      "phone": "047-403-9001",
                      "address": "千葉県習志野市花島３丁目２−７",
                      "category": "supermarket",
                      "image": { "fields": { "file": { "url": "https://pic4.homemate-research.com/pubuser1/pubuser_facility_img/7/7/8/75000000000000026877/0000002938/75000000000000026877_0000002938_3.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "53",
                      "shop_name": "船橋中学校",
                      "latitude": 35.7087956,
                      "longitude": 139.9866713,
                      "phone": "047-422-8121",
                      "address": "千葉県船橋市夏見2-11-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://pic1.homemate-research.com/pubuser1/pubuser_facility_img/4/3/2/00000000000000139234/0000000029/00000000000000139234_0000000029_1.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "54",
                      "shop_name": "湊中学校",
                      "latitude": 35.6902635,
                      "longitude": 139.9795171,
                      "phone": "047-431-5986",
                      "address": "千葉県船橋市日の出1-1-2",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/minato-j/0001/p014585_d/img/004.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "55",
                      "shop_name": "宮本中学校",
                      "latitude": 35.69467,
                      "longitude": 140.0014282,
                      "phone": "047-422-8127",
                      "address": "千葉県船橋市東船橋7-8-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/0/4/2/00000000000000139240/0000002331/00000000000000139240_0000002331_1.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "56",
                      "shop_name": "若松中学校",
                      "latitude": 35.6771308,
                      "longitude": 139.993363,
                      "phone": "047-431-1870",
                      "address": "千葉県船橋市若松3-2-3",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/wakamatu-j/0001/p014846_d/img/001.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "57",
                      "shop_name": "海神中学校",
                      "latitude": 35.7103798,
                      "longitude": 139.9760705,
                      "phone": "047-431-3074",
                      "address": "千葉県船橋市海神4-27-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/kaijin-j/0001/p014867_d/img/001.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "58",
                      "shop_name": "葛飾中学校",
                      "latitude": 35.7136062,
                      "longitude": 139.960804,
                      "phone": "047-431-2692",
                      "address": "千葉県船橋市印内1-5-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/katusika-j/0001/p014871_d/img/010.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "59",
                      "shop_name": "行田中学校",
                      "latitude": 35.7209518,
                      "longitude": 139.9701398,
                      "phone": "047-439-2118",
                      "address": "千葉県船橋市行田3-6-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://pic1.homemate-research.com/pubuser1/pubuser_facility_img/2/0/1/00000000000000118102/0000001557/00000000000000118102_0000001557_2.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "60",
                      "shop_name": "法田中学校",
                      "latitude": 35.7445742,
                      "longitude": 139.9846572,
                      "phone": "047-438-3026",
                      "address": "千葉県船橋市藤原7-46-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://pic1.homemate-research.com/pubuser1/pubuser_facility_img/5/3/2/00000000000000139235/0000046513/00000000000000139235_0000046513_3.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "61",
                      "shop_name": "旭中学校",
                      "latitude": 35.73593,
                      "longitude": 139.9873727,
                      "phone": "047-439-5710",
                      "address": "千葉県船橋市旭町2-23-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/asahi-j/0001/p044353_d/img/008.jpg" } } }
                    }
                  },
                  {
                    "fields": {
                      "id": "62",
                      "shop_name": "御滝中学校",
                      "latitude": 35.7378072,
                      "longitude": 140.0179232,
                      "phone": "047-448-3102",
                      "address": "千葉県船橋市金杉6-5-1",
                      "category": "localgovernment",
                      "image": { "fields": { "file": { "url": "https://www.chibanippo.co.jp/sites/default/files/IP200318TAN000046000.jpg" } } }
                    }
                  },
                      {
                        "fields": {
                          "id": "63",
                          "shop_name": "高根中学校",
                          "latitude": 35.726694,
                          "longitude": 140.0225257,
                          "phone": "047-464-3811",
                          "address": "千葉県船橋市新高根1-17-2",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://oh.openhouse-group.com/sp/simage/21112.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "64",
                          "shop_name": "八木が谷中学校",
                          "latitude": 35.7596546,
                          "longitude": 140.0324822,
                          "phone": "047-447-1455",
                          "address": "千葉県船橋市八木が谷2-9-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/1/4/2/00000000000000139241/0000002802/00000000000000139241_0000002802_2.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "65",
                          "shop_name": "前原中学校",
                          "latitude": 35.7038053,
                          "longitude": 140.0177527,
                          "phone": "047-478-6831",
                          "address": "千葉県船橋市中野木2-33-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://cdn.img-asp.jp/spot/1061977_1_2500_2700_3.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "66",
                          "shop_name": "二宮中学校",
                          "latitude": 35.7041437,
                          "longitude": 140.0340767,
                          "phone": "047-466-2453",
                          "address": "千葉県船橋市滝台1-2-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/ninomiya-j/0001/p015001_d/img/013.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "67",
                          "shop_name": "飯山満中学校",
                          "latitude": 35.7117106,
                          "longitude": 140.017861,
                          "phone": "047-422-0088",
                          "address": "千葉県船橋市飯山満町1-946-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/hasama-j/0001/p015142_d/img/004.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "68",
                          "shop_name": "芝山中学校",
                          "latitude": 35.7161357,
                          "longitude": 140.0198381,
                          "phone": "047-464-3448",
                          "address": "千葉県船橋市芝山1-40-11",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/sibayama-j/0001/p015142_d/img/044.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "69",
                          "shop_name": "七林中学校",
                          "latitude": 35.7165277,
                          "longitude": 140.0368145,
                          "phone": "047-464-7687",
                          "address": "",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://contents.realestate-db.net/yes1/images/bukken/2000106/20133490/neibour/2.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "70",
                          "shop_name": "三田中学校",
                          "latitude": 35.6988977,
                          "longitude": 140.0450673,
                          "phone": "047-477-0311",
                          "address": "千葉県船橋市田喜野井2-24-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/mita-j/0001/p015015_d/img/007.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "71",
                          "shop_name": "三山中学校",
                          "latitude": 35.701697,
                          "longitude": 140.057347,
                          "phone": "047-479-3000",
                          "address": "千葉県船橋市三山6-26-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://oh.openhouse-group.com/sp/simage/21092.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "72",
                          "shop_name": "高根台中学校",
                          "latitude": 35.7311743,
                          "longitude": 140.0431932,
                          "phone": "047-466-1710",
                          "address": "千葉県船橋市高根台3-3-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/takanedai-j/0001/p015166_d/img/003.jpg" } } }
                        }
                      },
                      {
                        "fields": {
                          "id": "73",
                          "shop_name": "習志野台中学校",
                          "latitude": 35.7219458,
                          "longitude": 140.0544878,
                          "phone": "047-466-1310",
                          "address": "千葉県船橋市習志野台6-23-1",
                          "category": "localgovernment",
                          "image": { "fields": { "file": { "url": "https://pic3.homemate-research.com/pubuser1/pubuser_facility_img/1/3/2/00000000000000139231/0000042169/00000000000000139231_0000042169_2.jpg" } } }
                        }
                      },
                        {
      
                              "fields": {
                                "id": "74",
                                "shop_name": "古和釜中学校",
                                "latitude": 35.7380767,
                                "longitude": 140.0495324,
                                "phone": "047-464-2331",
                                "address": "千葉県船橋市松が丘3-69-1",
                                "category": "localgovernment",
                                "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/kowagama-j/0001/p062150_d/img/006.jpg" } } }
                              }
                            },
                            {
                              "fields": {
                                "id": "75",
                                "shop_name": "坪井中学校",
                                "latitude": 35.7302335,
                                "longitude": 140.0556014,
                                "phone": "047-466-3104",
                                "address": "千葉県船橋市坪井東1-24-1",
                                "category": "localgovernment",
                                "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/tuboi-j/0001/p015062_d/img/009.jpg" } } }
                              }
                            },
                            {
                              "fields": {
                                "id": "76",
                                "shop_name": "大穴中学校",
                                "latitude": 35.741293,
                                "longitude": 140.0435141,
                                "phone": "047-462-3117",
                                "address": "千葉県船橋市大穴南3-19-2",
                                "category": "localgovernment",
                                "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/ooana-j/0003/p028514_d/img/001.jpg" } } }
                              }
                            },
                            {
                              "fields": {
                                "id": "77",
                                "shop_name": "豊富中学校",
                                "latitude": 35.7631061,
                                "longitude": 140.0635572,
                                "phone": "047-457-2030",
                                "address": "千葉県船橋市豊富町12",
                                "category": "localgovernment",
                                "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/toyotomi-j/0001/p015044_d/img/005.jpg" } } }
                              }
                            },
                            {
                              "fields": {
                                "id": "78",
                                "shop_name": "小室中学校",
                                "latitude": 35.7936659,
                                "longitude": 140.0748361,
                                "phone": "047-457-1865",
                                "address": "千葉県船橋市小室町898",
                                "category": "localgovernment",
                                "image": { "fields": { "file": { "url": "https://www.city.funabashi.lg.jp/gakkou/0002/komuro-j/0004/p103315_d/img/001.png" } } }
                              }
                            }
                          ]
                        };
                        

      const data = location;
      let markers = data.items

      markers = markers.map((item) => {
        const {
          shop_name,
          latitude,
          longitude,
          address,
          id,
          phone,
          category
        } = item.fields
        const image = item.fields.image.fields.file.url
        return { shop_name, latitude, longitude, address, id, phone, image , category}
      })
      return markers
    } catch (error) {
      document.getElementById('error_debug').innerHTML = '<p>errorです。</p>';
    }
  }
}

//　Mapの初期化
async function initMap() {

   // Window サイズに応じて、mapオプションの表示、非表示切り替え
  const myOptionsFunc = () => {
    if(window.innerWidth < 500) {
      console.log(window.innerWidth)
      return {
        zoom: 13,
        disableDefaultUI: true,
        center: new google.maps.LatLng(35.7246, 140.0581),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
    } else {
      return {
        zoom: 14,
        center: new google.maps.LatLng(35.7246, 140.0581),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // 地図と航空写真を切り替えるボタンを非表示にする
        mapTypeControl: false,
        zoomControl: false, // ズームコントロールを非表示
      }
    }
  }
  const myOptions = myOptionsFunc()
    // Google Mapsのスタイルを設定
    
  myOptions.styles = mapStyles;
  
  const map = new google.maps.Map(
    document.getElementById("map_canvas"),
    myOptions
  )

  // ストリートビューのコントロールを非表示にする
  map.setOptions({ streetViewControl: false });

  const markers = new GetData()

  // marker配列データからマーカーの作成およびli要素の作成
  async function createMarkers() {
    try {
      const items = await markers.getLocation();
      for (const item of items) {
        const id = item.id;
        const name = item.shop_name;
        const latlng = new google.maps.LatLng(item.latitude, item.longitude);
        const address = item.address;
        const phone = item.phone;
        const image = item.image;
        const category = item.category; // 追加: categoryの値を取得
        let icons;
        let defaultIconUrl, currentIconUrl;
        if (category === "localgovernment") {
          // defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
          // currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
          defaultIconUrl = "core/images/food_available.png";
          currentIconUrl = "core/images/food_available_big.png";
          icons = {
            url: defaultIconUrl,
            scaledSize: currentScaledSize,
          };
        } else {
          // defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
          // currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
          defaultIconUrl = "core/images/supermarket.png";
          currentIconUrl = "core/images/supermarket_big.png";
          icons = {
            url: defaultIconUrl,
            scaledSize: defaultScaledSize,
          };
        }
        createMarker(name, latlng, icons, map, id, address, phone, image, category);
        // console.log(item.latitude);
        maplistUl.innerHTML += `<li id="li-${id}"><img src=${image} /><div> <h4>${name}</h4> 住所：${address} </div></li>`;
        // maplistUl.innerHTML += `<li id="li-${id}"><iframe src="https://www.google.com/maps/embed/v1/streetview?key=AIzaSyDDiCLXghb5ALx0FvTuHTw40dO2hn5f3_8&location=${item.latitude},${item.longitude}"></iframe><div> <h4>${name}</h4> 住所：${address} </div></li>`;
      }
  
      maplistLi = document.querySelectorAll("#mapList li");
      maplistLi.forEach((listItem, index) => {
        listItem.addEventListener("click", () => {
          google.maps.event.trigger(maplist[index], "click");
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  
  




  createMarkers()
}

// 各マーカーをクリックした際に、対応するli要素を中央にスクロールする関数
function scrollToMapListElement(id) {
  const targetLi = document.getElementById(`li-${id}`);
  if (targetLi) {
    targetLi.scrollIntoView({
      behavior: "smooth", // スクロールアニメーションを有効にするために smooth を指定
      block: "center",    // 要素をスクロールビューの中央に配置
    });
  }
}

//　各マーカーのセット
function createMarker(name, latlng, icons, map, id, address, phone, image, category) { // 追加: categoryを引数に追加
  const infoWindow = new google.maps.InfoWindow();
  let defaultIconUrl, currentIconUrl;
  if (category === "localgovernment") { // カテゴリがlocalgovernmentの場合
    defaultIconUrl = "core/images/food_available.png";
    currentIconUrl = "core/images/food_available_big.png";
    // defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
    // currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
  } else { // それ以外の場合（supermarket）
    // defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
    // currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
    defaultIconUrl = "core/images/supermarket.png";
    currentIconUrl = "core/images/supermarket_big.png";
  }

  const marker = new google.maps.Marker({
    position: latlng,
    icon: {
      url: defaultIconUrl,
      scaledSize: icons.scaledSize,
    },
    map: map,
  });



  // liリストをclickしたときに、他のアイコンを初期状態にする。
  google.maps.event.addDomListener(maplistUl, "click", function () {
    marker.setIcon({
      url: defaultIconUrl,
      scaledSize: icons.scaledSize,
    })
  })

  // 新しくマーカーをclickしたときに、他のアイコンを初期状態にする。（※１）
  let flag = false ;

  google.maps.event.addDomListener(mapCanvas, "touchstart", function () {
    flag = true;
    marker.setIcon({
      url: defaultIconUrl,
      scaledSize: icons.scaledSize,
    })
  })

  google.maps.event.addDomListener(mapCanvas, "click", function () {
    if (flag) {
      flag = false;
    } else {
      marker.setIcon({
        url: defaultIconUrl,
        scaledSize: icons.scaledSize,
      })
    }
  })


  //　markerをクリックしたときの処理
  google.maps.event.addListener(marker, "click", function (e) {
    // クリック済みのMakerに対応するliリストのCSS背景を初期化
    maplistLi.forEach((item) => {
      if (item.classList.contains("clicked")) {
        item.classList.remove("clicked")
      }
    })
    //　clickしたマーカーのアイコンを変更する処理（※1の処理の後）
    setTimeout(function () {
      marker.setIcon({
        url: currentIconUrl,
        scaledSize: currentScaledSize,
      })
    }, 10)

    // infowindow の処理
    if (currentWindow) {
      currentWindow.close();
    }
    // ボタンを含むカスタムinfoWindowのcontentを作成
    infoWindow.setContent(`
      <div class="custom-info-window">
        <h3>${name}</h3>
        <p>${address}</p>
        <button id="infoButton" onclick="handleButtonClick(${id}, '${name}', ${latlng.lat()}, ${latlng.lng()}, '${icons.url}', '${address}', '${phone}', '${image}')">詳細 ></button>
      </div>
    `);

    infoWindow.open(map, marker)
    currentWindow = infoWindow

    //markerをクリックした時に地図の中心に
    map.panTo(latlng)

    //　クリックされたMarkerに対応するli要素のcss背景を操作する。
    maplistLi[id - 1].classList.add("clicked")

    // scrollToMapListElement(id);
    
  })
  maplist[cnt++] = marker

  marker.setIcon({
    url: defaultIconUrl,
    scaledSize: icons.scaledSize,
  })
}

// ボタンがクリックされたときの処理
function handleButtonClick(id, name, lat, lng, iconsUrl, address, phone, imageUrl) {
  // shop.htmlに渡すデータをURLパラメータとしてエンコードする
  const queryParams = new URLSearchParams({
    id: id,
    name: name,
    lat: lat,
    lng: lng,
    iconsUrl: iconsUrl,
    address: address,
    phone: phone,
    imageUrl: imageUrl,
  }).toString();

  // shop.htmlに遷移する
  window.location.href = `shop.html?${queryParams}`;
}

google.maps.event.addDomListener(window, "load", initMap)
