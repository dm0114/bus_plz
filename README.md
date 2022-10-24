# bus_plz
# 버스 위치 공유 프로젝트

Assign: sdf a
Status: Completed
기간: October 1, 2022 → October 17, 2022

## 1. 링크

### 1.1 사이트 주소

[https://ssafybus.netlify.app/](https://ssafybus.netlify.app/)

### 1.2 Github - Client (Vite)

[https://github.com/dm0114/bus_plz](https://github.com/dm0114/bus_plz)

### 1.3 Github - Device (ReactNative)

[https://github.com/dm0114/bus_plz_Device](https://github.com/dm0114/bus_plz_Device)

## 2. 서비스 소개

**예정된 셔틀 버스시간과 실제 도착하는 시간의 차이 때문에 불편을 겪는 사람들이 많아서 개발한 서비스**

## 3. 프로젝트 기간 (5일)

- 구상 : 10.1 ~ 10.2 (2일)
- 개발 : 10.3 (1일)
- 테스트 : 10.3, 10.17 (2일)

## 4. 기술 스택

![image.png](%E1%84%87%E1%85%A5%E1%84%89%E1%85%B3%20%E1%84%8B%E1%85%B1%E1%84%8E%E1%85%B5%20%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20e44253d8d68446f5983118a5f85ea599/image.png)

| ReactNative | - 기기의 지속적 위치 추적 정보를 App으로 넘겨주는 GPS 역할
- expo 프레임워크를 사용한 쉽고 간편한 배포 |
| --- | --- |
| Firebase | - 자료가 많고 간편한 데이터베이스 |
| CSR - Vite | - 적은 서버 부하 요구
- SEO가 중요하지 않음
- 빠른 build |
| KaKaoMap | - 지도 |
| Netlify | - 서버리스 배포 |

## 5. 웹 주요 기능

### 5.1 위치 추적

- 백그라운드 위치 추적
    - **`[*requestForegroundPermissionsAsync()*](https://docs.expo.dev/versions/latest/sdk/location/#locationrequestforegroundpermissionsasync)`** - 포그라운드 디바이스 위치 권한을 받는 expo API
    - *`[**requestBackgroundPermissionsAsync()**](https://docs.expo.dev/versions/latest/sdk/location/#locationrequestbackgroundpermissionsasync)`* - 백그라운드 디바이스 위치 권한을 받는 expo API

- 디바이스 위치를 지속적으로 DB로 전송
    
    **Firebase의 일일 API 제한으로 인해, 인터벌 주기를 20초로 설정**
    
    - `*setInterval()*` - 지속적인 함수 실행
    - *`getCurrentPositionAsync()`* - 디바이스의 현재 위치를 받는 API
    - `ref(), set()` - Firebase DB 참조 및 데이터 갱신

### 5.2 위치 렌더링

- 저장된 위치를 호출하여 화면에 그린다.
    - `ref(), onValue()` - Firebase DB 참조 및 데이터 요청
    - useEffect()를 이용하여 데이터 요청 이후 화면 리렌더링

## 6. 결과

지속적 수정 필요

![Untitled](%E1%84%87%E1%85%A5%E1%84%89%E1%85%B3%20%E1%84%8B%E1%85%B1%E1%84%8E%E1%85%B5%20%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20e44253d8d68446f5983118a5f85ea599/Untitled.png)

## 7. 배운 점

### React Native에 대한 간략한 이해

<aside>
💡 **RN은 레이어다**
JS와 Native가 메시지를 주고받기 위한 레이어이다.

</aside>

**특징**

- App의 모든 인프라는 Java, Swift의 기반 위에 있고, 
우리가 작성하는 부분은 JS, Markup/Styling에 불과하다.
- Bridge를 통해서 코드가 운영체제와 통신할 수 있도록 하는 인프라 (Java / Xcode)가 핵심
- 인프라를 통해 apk와 ipa에 넣어 app store로 보낸다.
- **인프라는 JS와 Platform APIs(OS)가 통신할 수 있도록 한다.**

**실행 과정**

1. Device - 이벤트 감지
2. Device - 이벤트에 대한 데이터 수집 - 화면의 어디서, 얼마나 이벤트가 발생했는지
3. RN - 이벤트 데이터로 JSON 메시지 생성
4. JS - JSON 메시지를 받아서 코드 실행
5. JS - RN에 메시지 res
6. RN - Device(Native)에 메시지 res
7. Device - 명령 처리
8. Device - 화면에 반영

### Background / Foreground

**화면에 보여지냐, 혹은 보이지 않느냐의 차이**

- 포그라운드 작업은 일반적으로 사용자가 명령을 실행하는 방식이다.
- 백그라운드 기능을 사용하면 앞에서 프로세스가 실행되는 동안 뒤에서 다른 프로세스가 실행될 수 있으므로 한 터미널에서 여러개의 프로세스를 동시에 실행할 수 있다.
- 백그라운드 방식으로 명령을 실행하면 명령의 처리가 끝나는 것과 관계없이 곧바로 프롬프트가 출력된다. 그래서 사용자가 다른 작업을 계속할 수 있다. 필요한 여러작업을 백그라운드로 실행한 후, 터미널에서는 포그라운드 작업을 계속 진행할 수 있다.

참고

---

[https://salix97.tistory.com/48](https://salix97.tistory.com/48)

[https://keykat7.blogspot.com/2021/01/android-notification-foreground-service.html#google_vignette](https://keykat7.blogspot.com/2021/01/android-notification-foreground-service.html#google_vignette)

[https://developer.android.com/guide/components/services?hl=ko](https://developer.android.com/guide/components/services?hl=ko)

### UseEffect에 대한 이해

- 지도가 데이터 패칭 이전에 렌더링되어, 빈 지도가 렌더링이 되는 문제가 있었다.
- useEffect를 두 개 사용하여 해결하였다.
    - 첫 번째 useEffect는 위도, 경도 데이터를 가져온 후, 주기적으로 계속 다시 가져온다.
    - 두 번째 useEffect는 위도 경도 데이터가 변화할 때, 화면을 다시 렌더링한다.
    
    ```jsx
    // 마운트 시점에만 실행
      useEffect(() => {
        ReactGA.initialize(TRACKING_ID)
        ReactGA.pageview(window.location.pathname);
    
        onValue(dbRef, (snapshot) => {
          const { latitude, longitude } = snapshot.val();
          setGeoData([latitude, longitude])
        });
    
        setInterval( async () => {
          onValue(dbRef, (snapshot) => {
            const { latitude, longitude } = snapshot.val();
            setGeoData([latitude, longitude])
          });
        }, 20000)
      }, [])
    
      // 데이터 변경시 렌더링
      useEffect(() => {
      }, [geoData])
    ```
    
    참고
    
    ---
    
    [https://www.zerocho.com/category/React/post/5f9a7c8807be1d0004347311](https://www.zerocho.com/category/React/post/5f9a7c8807be1d0004347311)
    
    [https://ko.reactjs.org/docs/hooks-reference.html#useeffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)
    

### 환경변수 적용

**API KEY 배포를 방지하기 위해서 `[.env` 를 사용](https://velog.io/@eassy/환경변수-.env-도텐브)해야 한다.**

- vite는 VITE_로 환경변수 생성해야 한다.
- `[import.meta.env` 를 통해서 .env에 접근한다.](https://vitejs-kr.github.io/guide/env-and-mode.html#env-variables)
- html에서 환경 변수를 사용하려면 [vite-plugin-html-env](https://www.npmjs.com/package/vite-plugin-html-env)를 설치한다.
- `[yarn add ~ -d` - dev Dependancy 설치 ⇒ 배포시 주의](https://www.codeit.kr/community/threads/29051)

### Netlify CLI 배포

- 정적 웹사이트 서비스 제공, HTTPS 지원, Github Repository 와 연동
- 참고  |  [https://docs.netlify.com/cli/get-started/](https://docs.netlify.com/cli/get-started/)
- 참고  |  [PaaS](https://www.redhat.com/en/topics/cloud-computing/what-is-paas)

### 데이터 수집을 위한 구글 애널리틱스 연동

- [리액트와 구글 애널리틱스](https://fromnowwon.tistory.com/entry/react-ga-google-analytics)
