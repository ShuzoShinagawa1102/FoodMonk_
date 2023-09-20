// get maplist
const maplist = new Array()
const maplistUl = document.getElementById("mapList")
let maplistLi = document.querySelectorAll("#mapList li")

// get map data
const mapCanvas = document.getElementById("map_canvas")
let currentWindow = null
let cnt = 0
// const defaultIconUrl = "../images/food_available.png"
// const currentIconUrl = '../images/food_available_big.png'
const defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png"
const currentIconUrl = 'https://icooon-mono.com/i/icon_11160/icon_111601_48.png'
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
                "url": "data:image/jpeg;base64,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"
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
                "url": "https://poiend-pctr.c.yimg.jp/scB1-4nSfmnn-5z52DLqwx2bzMt-V5hh8NysQqsO5iqAgKq5Oeq9-FcdfR5JCB_aAKoOJIBtgYoes48gkIBnaIxmtCU0azow1OQ6U7k3bd3xa7HHDePdSmY5y9dP-Akc2tIYy-sAahiyvF8zy5QTHQ=="
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
                "url": "https://pic2.homemate-research.com/pubuser1/pubuser_facility_img/1/7/7/00000000000000144771/0000022854/00000000000000144771_0000022854_2.jpg"
              }
            }
          }
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
          defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
          currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
          icons = {
            url: defaultIconUrl,
            scaledSize: currentScaledSize,
          };
        } else {
          defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
          currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
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
    defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
    currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
  } else { // それ以外の場合（supermarket）
    defaultIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
    currentIconUrl = "https://icooon-mono.com/i/icon_11160/icon_111601_48.png";
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
