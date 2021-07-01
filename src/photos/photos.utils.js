export const processHashtags = (caption) => {
  // 정규표현식(Regular Expression) 사용
  // 패턴을 통해 String 내에 있는 특정 String을 추출
  // # -> 해쉬 기호, [\w] -> 텍스트의 마지막 character까지 이어지는 문자의 집합
  // 영어만 하려면 /#[\w]+/g
  // 캡션에 해시태그가 없을 경우를 위해서 || []를 줌
  const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\w]+/g) || []
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }))
}
