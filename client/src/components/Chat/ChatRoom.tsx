import React, { useRef, useState } from "react";
import "./Chat.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import { UserChat } from "./Chat";
import style from "./Chat.module.css";
import ChatMessage from "./ChatMessage";
import profilePicture from "../../images/profile_pic.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ChatData {
  users: Array<UserChat>;
  id: string;
}

interface ChatRoomData {
  userLoged: UserChat;
  users: Array<UserChat>;
  id: string;
  setChatSelected: React.Dispatch<React.SetStateAction<ChatData>>;
}

export default function ChatRoom(props: React.PropsWithChildren<ChatRoomData>) {
  const dummy: any = useRef();

  let messagesRef = firestore
    .collection("chatsRooms")
    .doc(props.id)
    .collection("messages");
  const queryMessages = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(queryMessages, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: props.userLoged.mail,
      name: props.userLoged.name,
      photoURL: profilePicture,
    });

    setFormValue("");
    dummy!.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="App w-75">
        <nav className={"navbar " + style.background}>
          <div
            className={
              "w-100 d-flex flex-row justify-content-start align-items-center"
            }
          >
            <button
              className={
                "text-white fs-6 mx-3 border-0 rounded-1 " +
                style.background
              }
              onClick={() => props.setChatSelected({ users: [], id: "" })}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={"1x"}/>
            </button>
            <img
              src={profilePicture}
              className={"rounded-circle mx-3 " + style.imgMessage}
              alt="profile"
            />
            <span className="text-white fs-5 ">
              {props.users.map((user) =>
                user.mail !== props.userLoged.mail
                  ? user.name + " " + user.lastName
                  : ""
              )}
            </span>
          </div>
        </nav>

        <section
          className={"d-flex flex-column justify-content-center bg-light"}
        >
          <main className={"d-flex flex-column justify-content-start p-3 border " + style.main}>
            {messages &&
              messages.map((msg: any, i) => (
                <ChatMessage
                  key={i}
                  message={{ ...msg, user: props.userLoged.mail }}
                />
              ))}
            <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage} className={"d-flex bg-dark w-100"}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Envia un mensaje"
              className={"border rounded-0 w-100 px-3 fs-6 bg-light "}
            />

            <button
              type="submit"
              disabled={!formValue}
              className={"px-4 py-3 bg-secondary border-0"}
            >
              🕊️
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
