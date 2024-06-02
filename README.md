# 소프트웨어공학 Term Project

- 해당 레포지터리는, 2024년 중앙대학교 소프트웨어학부 소프트웨어공학 팀 과제를 위해 제작되었습니다.
- 주요 기술은, React Native, ESLint, git, Prettier, TypeScript이며 실행 가능 OS는 Andriod, Ios입니다.

# 주요 기능 소개
- 해당 과제는, MUST 포함 기능들이 서술되어있으며, 이에 대한 정보는 보고서 및 다음 README 파일에서 확인 가능합니다.

## 계정 추가
- 어플리케이션 첫 실행과 동시에, 로그인 화면과 회원가입 화면을 확인할 수 있습니다.

<img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/7e643f13-0a6b-4a67-a31b-1f199642622b" alt="로그인 화면" width="400"/>

- 회원가입 화면 내에서, 사용자는 아이디, 이름, 이메일, 비밀번호, 비밀번호 확인 칸에 입력을 하여 회원가입을 할 수 있습니다.
- 또한, 팝업창의 형태로 자신이 어떤 어떤 역할을 하는지 선택하여 회원 계정을 추가할 수 있습니다.

<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/8660b32f-6917-4d76-a62f-43b1645e7027" alt="회원가입 화면" width="30%"/>
    <img src="https://github.com/Soft-Gallery/issue-management-app/assets/71542970/3cd1acec-c622-493e-b2bf-0e96640a47ee" alt="역할 선택 팝업창" width="30%"/>
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


