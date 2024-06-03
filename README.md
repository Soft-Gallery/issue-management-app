# 소프트웨어공학 Term Project

- 해당 레포지터리는, 2024년 중앙대학교 소프트웨어학부 소프트웨어공학 팀 과제를 위해 제작되었습니다.
- 주요 기술은, React Native, ESLint, git, Prettier, TypeScript이며 실행 가능 OS는 Andriod, Ios입니다.
- 배포된 서버가 아닌, ngrok 서버를 작동시켜야 실행되는 어플리케이션입니다.
- 팀 관련된 구체적인 설명은, frontEnd 레포를 확인해주시길 바라겠습니다.

# 어플리케이션 구현 방법
- React Native && TypeScript를 사용하였으며, Expo-Cli프로젝트를 구현하여, 빠른 배포를 목표로 제작되었습니다.
- 어플리케이션의 주요 로직은, src 폴더 내에, 기능 별로 구분되어있으며, 도메인에 맞춰 pages가 제작되어있습니다.

![image](https://github.com/Soft-Gallery/issue-management-app/assets/71542970/b7248cc5-501f-4a31-b0ad-0b35646b3f7b)

다음과 같은 기술이 사용되었습니다.
## TypeScript
TypeScript는 JavaScript의 상위 집합으로, 정적 타입을 추가하여 코드의 품질과 유지보수성을 향상시킵니다. 타입 안전성을 제공하여 코드 작성 시 오류를 사전에 방지하고, 코드의 가독성과 유지보수성을 높입니다.

## ESLint
ESLint는 JavaScript와 TypeScript 코드에서 문제를 식별하고 수정할 수 있도록 도와주는 린터입니다. 일관된 코드 스타일을 유지하고, 잠재적인 오류를 사전에 방지하여 코드 품질을 향상시킵니다. Prettier는 코드 포매터로, 코드 스타일을 일관되게 유지하여 가독성을 높이고 팀 간의 코드 스타일 불일치를 방지합니다.

![image](https://github.com/Soft-Gallery/issue-management-app/assets/71542970/59b0ebbb-d371-4897-bf83-761b7d7eb901)

## Recoil
Recoil은 React 상태 관리 라이브러리로, 글로벌 상태를 쉽게 관리하고 업데이트할 수 있도록 도와줍니다. 복잡한 상태 관리를 단순화하고, React 컴포넌트 간의 상태 공유를 용이하게 합니다.

![image](https://github.com/Soft-Gallery/issue-management-app/assets/71542970/b4f35a50-7996-4050-bfc1-9a55466fed0e)

## Axios
Axios는 HTTP 클라이언트 라이브러리로, API 요청을 쉽게 처리할 수 있게 해줍니다. 간단하고 직관적인 API를 제공하여 비동기 HTTP 요청을 관리하고, 응답을 처리하는 과정을 간소화합니다.

![image](https://github.com/Soft-Gallery/issue-management-app/assets/71542970/df5cf45e-505e-4656-8da0-8c253a2c9f07)


## EAS
EAS(Expo Application Services)는 Expo에서 제공하는 배포 도구로, 빌드 및 배포 과정을 자동화하여 애플리케이션을 신속하게 배포할 수 있게 해줍니다. 이를 통해 개발자는 빌드 및 배포에 소요되는 시간을 절약하고, 개발에 집중할 수 있습니다.

![image](https://github.com/Soft-Gallery/issue-management-app/assets/71542970/b91c8671-2969-428e-ac31-099f86c9048e)

## Babel
Babel은 JavaScript 트랜스파일러로, 최신 JavaScript 문법을 구버전 브라우저에서도 호환되도록 변환해줍니다. 이를 통해 최신 언어 기능을 사용하면서도 다양한 환경에서 코드가 정상적으로 작동하도록 합니다.

![image](https://github.com/Soft-Gallery/issue-management-app/assets/71542970/332aed26-37f6-43d5-be2b-2d63d442ab0c)


# 주요 기능 소개
- 해당 과제는, MUST 포함 기능들이 서술되어있으며, 이에 대한 정보는 보고서 및 다음 README 파일에서 확인 가능합니다.

## 계정 추가
- 어플리케이션 첫 실행과 동시에, 로그인 화면과 회원가입 화면을 확인할 수 있습니다.

<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/7e643f13-0a6b-4a67-a31b-1f199642622b" alt="로그인 화면" width="400"/>

- 회원가입 화면 내에서, 사용자는 아이디, 이름, 이메일, 비밀번호, 비밀번호 확인 칸에 입력을 하여 회원가입을 할 수 있습니다.
- 또한, 팝업창의 형태로 자신이 어떤 역할을 하는지 선택하여 회원 계정을 추가할 수 있습니다.

<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/8660b32f-6917-4d76-a62f-43b1645e7027" alt="회원가입 화면" width="45%"/>
    <img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/3cd1acec-c622-493e-b2bf-0e96640a47ee" alt="역할 선택 팝업창" width="45%"/>
</div>

## 이슈 생성 및 브라우징 검색 및 이슈 상세 정보
- 어플리케이션 내에서, 이슈를 생성할 수 있는 유저는, 다음과 같이 Create Issue라는 버튼을 통해 이슈를 생성할 수 있습니다.
- 어플리케이션 내에서, 각각 역할에 맞는 이슈를 브라우징 할 수 있는 버튼들이 존재합니다. 해당 버튼을 누른다면, 해당하는 상태의 이슈들만 필터링하여 조회할 수 있습니다.
- 이슈를 보여주는 모든 UI에는, 이슈와 관련된 간단한 정보들이 추가되어 있습니다.

<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/890ced51-fd8e-4fe4-9dc0-850eb8e55c9e" alt="이슈 화면" width="400"/>

## 이슈 코멘트 작성 및 이슈 상태 변경
- 어플리케이션 내에서, 이슈를 생성하거나, 이슈 상태를 바꿀 수 있는 과정에서 코멘트를 작성할 수 있는 기능을 구현하였습니다.
- 코멘트는, 이슈 확인이나 코멘트를 적는 동시에 확인이 가능하며, 특정 활동에는 코멘트가 필요한 경우도 있습니다.
- 예를 들어, 개발자가 이슈에 코멘트를 작성함과 동시에, 해당 이슈를 고쳤다는 체크를 한 후에 작성을 한다면 이슈의 상태가 'FIXED'로 변경되는 기능도 구현이 되어있습니다.

<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/c2011703-3c10-406d-9568-2ef345b49129" alt="이슈 화면" width="400"/>

## 담당자 추천 기능
- 어플리케이션 내에서, GPT api 및 파인튜닝을 이용하여, 현재 배정된 인원들 중에서 담당 개발자를 추천하고, 그 이유에 대해서 제공해주는 기능이 존재합니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/e58a58ff-28c1-4d0e-ac2b-172688636ee9" alt="이슈 화면" width="400"/>

## 이슈 통계 분석
- 어플리케이션 내에서, 현재 전체적으로 이슈와 관련하여 어떤 통계값을 조회할 수 있는지 볼 수 있는 페이지를 제공합니다.

<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/dd192a62-20af-42bb-bffa-7104005eafda" alt="이슈 화면" width="400"/>

# 예제 시나리오

## 어드민의 프로젝트 생성

1. 어드민 계정으로 로그인 후, Create Project를 누른다면 첫 번째로, 프로젝트의 타이틀과 설명을 작성할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/50364470-e005-47c8-ae48-01ce512e829a" alt="프로젝트 생성" width="400"/>

2. 이후, 해당 프로젝트에 PL, DEV, TESTER로 지정할 사람들을 선택한 후에, Confirm Members 버튼을 누르면, 멤버가 할당된 프로젝트 생성이 완료됩니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/74252571-6050-4ca3-a089-28ee017c1b09" alt="멤버 할당" width="400"/>

## 테스터의 이슈 생성

1. 테스터 계정으로 접속시, 본인에게 할당된 프로젝트를 선택하여 화면 이동이 가능합니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/26e8be73-b08c-4248-99b2-fd2c4f0ef1a1" alt="프로젝트 선택" width="400"/>

2. 해당 페이지에서는, 프로젝트 내에서의 이슈를 브라우징할 수 있으며, 이슈를 생성할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/b4197ce0-94b9-494b-b074-1e368c065b62" alt="이슈 브라우징" width="400"/>

3. 이슈를 생성하는 버튼을 누르면, 타이틀, 설명, 그리고 초기 코멘트를 작성하여 이슈를 생성할 수 있고, 해당 이슈의 reporter는 이 이슈를 생성한 tester의 id가 됩니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/1658ea7c-a0a2-4d45-beee-3ddf0a062bd2" alt="이슈 생성" width="400"/>

## PL의 이슈 브라우징 및 담당자 지정 && 담당자 추천

1. PL은, 현재 'New', 'Resolved', 'Closed', 'All'상태인 이슈들을 각각 브라우징하여 검색할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/1f4ff49b-3db3-400b-9ab1-a2b8622ce337" alt="이슈 브라우징" width="400"/>

2. PL은, 'NEW'탭에서 NEW 상태인 이슈를 누르면, 해당 이슈에 대해서 개발자를 배정할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/96a5e177-f540-4e1a-91b6-bb9245dd9d5d" alt="개발자 배정" width="400"/>

3. 이때, 어떤 개발자가 이 프로젝트에 적절하게 배정할지 판단을 인공지능에게 맞춰서 제공받고 싶다면 GPT Analysis를 눌러서, 추천을 받을 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/c848878a-9876-4833-ac69-02bce5bf5b66" alt="GPT 분석" width="400"/>

4. 이때, 개발자를 선택하고 이슈에 대해서 코멘트를 작성하면, 개발자가 이 이슈에 할당되고, 개발자는 자신에게 할당된 이슈를 확인할 수 있게 됩니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/94ef022d-13be-42fb-872c-eaaf1c4e0ef2" alt="이슈 할당" width="400"/>

## DEV의 자신에게 assign된 이슈 브라우징 및, 코멘트 + issue 상태 fix

1. 개발자는 로그인 시에, 자신에게 assign된 이슈를 확인할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/2ab40eba-5747-483a-b415-e842337ab38e" alt="할당된 이슈 확인" width="400"/>

2. 개발자가 해당 이슈를 확인하면 지금까지 tester와 pl이 작성한 코멘트를 확인할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/8f7c398e-8860-4ff6-bc0c-b67ecc2903ab" alt="코멘트 확인" width="400"/>

3. 개발자가 코드를 고친다면, 코멘트와 함께 fix complete!!버튼을 누르면, 해당 이슈의 상태가 fixed로 변경이 됩니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/5fb00e6f-69b0-4685-99b7-df88ec14354d" alt="상태 변경" width="400"/>

## Tester의 이슈 상태 resolved로 변경

1. Tester는, Dev가 fixed로 변경한 상태의 이슈들을 브라우징 할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/748768d2-4082-401b-ab2c-3249ebea2825" alt="이슈 브라우징" width="400"/>

2. FIXED인 상태의 이슈를 누르면, 팝업을 통해서, 해당 이슈를 Resolved상태로 변경할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/a9b41529-54f0-491b-b976-c34311b3cbcb" alt="상태 변경" width="400"/>

## PL의 이슈상태 Closed로 변경

1. PL은, 테스터가 Resolved로 변경한 이슈를 Closed상태로 변경 가능합니다. (Resolved로 표시된 이슈를 누르고 다음 팝업을 진행합니다.)
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/e30e43c1-5387-42ff-a1fb-d5bb1a1b760d" alt="상태 변경" width="400"/>

## PL의 Closed된 이슈를 다시 Reopen상태로 변경

1. PL은, 다시 이슈를 다룰 필요가 있다고 판단이 되면, 해당 이슈를 다시 Reopen할 수 있습니다. (Closed상태인 이슈를 누르고 해당 팝업을 진행합니다.)
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/ecaa7e80-a2ea-4106-b47b-20e3206696ca" alt="상태 변경" width="400"/>

## 통계차트

1. 모든 사용자들은, project를 선택하는 과정 이전에, '통계 보기'라는 버튼을 통해서, 현재 어떤 이슈들이 어떤 통계값을 가지는지 확인할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/2e4fb9bf-3bf4-427f-bdad-172a9b953d71" alt="통계 보기" width="400"/>

2. 해당 페이지에서, 오른쪽 왼쪽으로 스와이핑을 하면, 이슈 상태, 우선 순위, 주요 원인에 대해서 전체적인 이슈들이 갖는 통계값을 확인할 수 있습니다.
<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/157a2dca-d217-41c4-bef9-62b78172531a" alt="통계값" width="400"/>

