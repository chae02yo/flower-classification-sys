// typescript에게 특정 파일 패턴(*.module.css)에 대한 모듈 선언을 알려줌
declare module '*.module.css' {
  // classes는 css modlue 파일에서 가져온 클래스 이름과 해당 클래스 이름이 변환된 고유한 이름을 매핑하는 객체
  // key-value 쌍, key는 CSS 클래스 이름, value는 CSS modlue이 변환 후 생성한 고유한 클래스 이름
  const classes: { [key: string]: string };
  export default classes;
}