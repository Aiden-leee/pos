## React.js POS System
#### 음식 POS 앱

![pos](https://github.com/Aiden-leee/pos/assets/52125590/f28bd3bd-1c53-4a8e-b9b6-ecbd1a59a0c0)



### 실행
```
// frontend
cd frontend
npm install
npm start

// backend
cd backend
npm install
npm start
```


### 버전
```
node : v16.17.0
react : 18.2.0
react-dom : 18.2.0
react-router-dom : 6.22.3
axios : 1.6.8
express : 4.19.2
node-sass : 7.0.3
tailwindcss : 3.4.3
```

### API
#### db.json
테이블의 주문 상태와 음식 메뉴들의 데이터 형태 
```json
{
  "tables": [
    {
      "tid": "t1-a2d99639",  // tn-uuid 형태의 고유값
      "id": "t1",            // 고유 id 값
      "status": "occupied",  // occupied, vacant, orderhold 의 3가지 상태값을 갖음
      "hc": 0,               // 인원수
      "price": 60000,        // foods 의 총 금액
      "foods": [             // 주문 메뉴들 
        {
          "id": "4",         // 메뉴의 고유 id
          "title": "Steak",  // 메뉴의 이름 
          "description": "", // 메뉴 설명
          "image": "",       // 메뉴 이미지경로
          "price": 24000,    // 메뉴의 가격
          "quantity": 1      // 메뉴의 수량
        },
      ],
      "date": "2024/5/24 14:49:31",    // 메뉴 최초 등록 시간
      "updated": "2024/5/28 00:20:11"  // 메뉴 추가 등록 시간
    },
  ],
  "foods": [
    {
      "id": "1",             // 메뉴의 고유 id
      "title": "Pizza",      // 메뉴의 이름
      "description": "",     // 메뉴 설명
      "image": "",           // 메뉴 이미지경로
      "price": 20000         // 메뉴 가격
    }
  ]
}
```

#### sales.json
결제 후의 데이터 형태
```json
{
  "sales": [
    {
      "tid": "t4-dd0b17ac",   // tn-uuid 형태의 고유값
      "id": "t4",             // 고유 id 값
      "status": "occupied",   // occupied, vacant, orderhold 의 3가지 상태값을 갖음
      "hc": 0,                // 인원수
      "price": 24000,         // foods 의 총 금액
      "foods": [              // 주문 메뉴들 
        {
          "id": "4",          // 메뉴의 고유 id
          "title": "Steak",   // 메뉴의 이름 
          "description": "",  // 메뉴 설명
          "image": "",        // 메뉴 이미지경로
          "price": 24000,     // 메뉴 가격
          "quantity": 1       // 메뉴의 수량
        }
      ],
      "date": "2024-05-05",              // 메뉴 최초 주문시간
      "updated": "2024/5/27 18:04:36",   // 메뉴 추가 주문 시간
      "paydate": "2024/5/27 18:06:53"    // 결제 시간 
    },
  ]
}
```



### 페이지별 영상
#### Order 

https://github.com/Aiden-leee/pos/assets/52125590/35bcd2c3-0c1b-4841-84c3-61e588ef9ac5


#### Etc Add

https://github.com/Aiden-leee/pos/assets/52125590/0ba495db-5174-4df1-b2a1-eb6f6cfaf943


#### modify & payments

https://github.com/Aiden-leee/pos/assets/52125590/45bca0a3-0723-41c7-a4b7-d888a909ad15


#### Sales List Page

https://github.com/Aiden-leee/pos/assets/52125590/b94e0baa-2de3-45f5-8e66-9fb43e09c2ef


