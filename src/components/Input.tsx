import { useRecoilState } from "recoil";
import { chatListState, chatLoadingState } from "../../store/chat.ts";
import { sendMessage } from "../../api/chat.ts";

export function Input() {
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [isLoading, setIsLoading] = useRecoilState(chatLoadingState);
const content = ''
  const handleSend = () => {
    if (content !== "" && isLoading === false) {
      setIsLoading(true); //로딩중 이미지 띄움
      setChatList((prev: any[]) => [
        ...prev,
        { role: "user", content: content },
      ]); //화면에 보여줄 채팅 내역에 지금 전송한 메세지 추가
      setChatList(""); //메세지 필드 비우기

      //위에 정의한 sendMessage 호출. string content를 인수로 함.
      //요청에 대한 응답 res를 받으면 화면에 보여줄 채팅 내역에 추가.
      sendMessage(content)
        .then(res => {
          setChatList((prev: never) => [
            ...prev,
            { role: "assistant", content: res.choices[0].message.content },
          ]);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false); //로딩중 해제
        });
    }
  };
  
}
