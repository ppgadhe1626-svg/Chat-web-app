import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import "../Styles/Chat_Page.css"
import { UserContext } from "../Context.js"
import { socket } from '../SocketIO.jsx'

import Chat_Card from "../Components/Chat_Card.jsx";
import User_Card from "../Components/User_Card.jsx"
import Chatting_Box from "../Components/Chatting_Box";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaBell, FaCalendar, FaPlus } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BsThreeDotsVertical, BsPaperclip, BsEmojiSmile, BsFillSendFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";


const Chat_Page = () => {
    const { id, setId, email, setEmail, name, setName, password, setPassword } = useContext(UserContext)
    // console.log(id);
    // const [userChatIdArr, setUserChatIdArr] = useState([]);
    const [userChatData, setUserChatData] = useState([]);
    const [allUserArr, setAllUserArr] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [addChat, setAddChat] = useState(0);
    const [groupChat, setGroupChat] = useState(0);
    const [selectedChat, setSelectedChat] = useState();
    const [inputMessageValue, setInputMessageValue] = useState("");
    const [groupName, setGroupName] = useState();
    const [showChatDropDown, setShowChatDropDown] = useState(0);

    // Fetch chat user IDs
    // Fetch chat all IDs
    async function addUser() {
        if (groupChat) {
            const req = { user_ids: [id, ...selectedUsers], name: groupName }
            // console.log(req)
            let res = await axios.post("http://localhost:8000/chat/create-group-chat", req)
            setUserChatData([...userChatData, res.data.chat])
        }
        else {

            try {
                const req = { user_ids: [id, ...selectedUsers] }
                // console.log(req)
                let res = await axios.post("http://localhost:8000/chat/create-private-chat", req)
                // console.log(res)
                setUserChatData((prev) => [...prev, { ...res.data.chat, name: "User" }])
            } catch (error) {
                console.log(error || error?.message)
            }
        }
    }

    useEffect(() => {
        // user specific chats
        async function fetchChatIds() {
            try {
                // console.log("HII");
                const response = await axios.get(`http://localhost:8000/user/chat/${id}`);
                setUserChatData(response.data.message); // Assuming API returns an array of chat IDs
            } catch (error) {
                console.error("Error fetching chat IDs: ", error);
            }
        }

        async function fetchAllUsers() {
            try {
                const response = await axios.get(`http://localhost:8000/user/all_user`);
                setAllUserArr(response.data.message); // Assuming API returns an array of User IDs
            } catch (error) {
                console.error("Error fetching User IDs: ", error);
            }
        }
        fetchAllUsers();
        fetchChatIds();
    }, [id]);

    useEffect(() => {
        if (selectedChat) {
            console.log(selectedChat)
        }
    }, [selectedChat])

    useEffect(() => {
        if(userChatData?.length === 0) return

        const handleReceiveMsg = (msg, chat_id) => {
            console.log('hi',msg, chat_id)
            console.log("Before update:", userChatData);

            const updatedChats = userChatData.map((chat) => {
                if (chat?._id === chat_id && msg.sender !== id) {
                    return {
                        ...chat,
                        messages: [...chat.messages, msg],
                        lastMessage: msg,
                        unreadMessageCount: (chat.unreadMessageCount || 0) + 1,
                    };
                }
                return chat;
            });

            console.log("After update:", updatedChats);
            setUserChatData([...updatedChats]);

            if (selectedChat && selectedChat._id == chat_id && msg.sender !== id) {
                console.log('here')
                setSelectedChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, msg],
                    lastMessage: msg,
                }));
            }
        }

        socket.on('receive message', handleReceiveMsg);
        return ()=>{
            socket.off('receive message', handleReceiveMsg)
        }
    }, [userChatData,selectedChat])
    
    useEffect(()=>{
        console.log(selectedChat?.messages[selectedChat?.messages?.length - 1])
    },[selectedChat?.messages?.length])

    async function onMessageSend() {
        let res = await axios.post(`http://localhost:8000/message/send`, { message: inputMessageValue, sender: id, chat_id: selectedChat._id });
        setSelectedChat({ ...res.data.chat });
        // console.log("WHY");
        console.log(res.data, res.data.chat.messages[res.data.chat.messages.length - 1], selectedChat._id)
        socket.emit("send message", res.data.chat.messages[res.data.chat.messages.length - 1], selectedChat._id);
    }

    async function onDeleteChat() {
        // console.log(selectedChat);
        setUserChatData(userChatData.filter(chat => chat._id !== selectedChat?._id))
        let res = await axios.delete(`http://localhost:8000/chat/delete`, { data: { chat: selectedChat } })
        // console.log(res);
        setSelectedChat(null)
    }

    async function onClearChat() {
        let res = await axios.delete(`http://localhost:8000/chat/clear`, { data: { chat: selectedChat } })
        // let ress = await axios.delete(`http://localhost:8000/message/deleteAllMessagesFromDatabase`)
        // console.log(res);
        setSelectedChat({ ...selectedChat, messages: [] })
        const filtered = userChatData.map((chat) => {
            // console.log(chat)
            if (chat?._id == selectedChat._id) {
                chat.messages = []
            }
            return chat
        })
        // console.log(filtered)
        setUserChatData(filtered)
    }

    // console.log(userChatIdArr);
    return (
        <div className="chat-page">
            <div className="chat-icons">
                <div className="chat-ham">
                    <GiHamburgerMenu />
                </div>
                <div className="chat-icon">
                    <FaHome />
                    <FaMessage />
                    <MdPeopleAlt />
                    <FaBell />
                    <FaCalendar />
                    <IoMdSettings />
                </div>
            </div>
            {/* {console.log(userChatIdArr)} */}
            {!addChat ?
                (<div className="chats">
                    <div className="chat-heading-and-add-chat">
                        <div className="heading" style={{ margin: '2vmin', alignSelf: 'flex-start' }}>Chat</div>
                        <button className="add-chat" onClick={() => { setAddChat(!addChat) }}> <FaPlus /> </button>
                    </div>
                    <hr />
                    <input className="chat-search" type="text" placeholder="&#x1F50D; Search" />
                    <div className="chat-cards">
                        {userChatData?.length && userChatData.map((chat, index) => (
                            <Chat_Card setSelectedChat={setSelectedChat} chatInfo={chat} key={index} />
                        ))}
                    </div>
                </div>)

                :

                (<div className="chats">
                    <div className="chat-heading-and-add-chat">
                        <div className="heading" style={{ margin: '2vmin', alignSelf: 'flex-start' }}>Add Chat</div>
                        <button className="add-chat" onClick={() => { setAddChat(!addChat) }}> <TiTick /> </button>
                    </div>
                    <hr />
                    <input className="chat-search" type="text" placeholder="&#x1F50D; Search" />
                    <div className="chat-create-buttons">
                        {groupChat ? (
                            <button style={{ "backgroundColor": "green" }} type="checkbox" className="chat-group-create" onClick={() => { setGroupChat(!groupChat) }}> Create Group </button>
                        )
                            :
                            (<button type="checkbox" className="chat-group-create" onClick={() => { setGroupChat(!groupChat) }}> Create Group </button>)}
                        <button className="create-chat" onClick={addUser}> Start Chat </button>
                    </div>
                    {groupChat ? (
                        <input type="text" name="groupName" id="groupName" placeholder="Enter Group Name..." onChange={(event) => { setGroupName(event.target.value) }} />
                    ) : (<></>)}
                    <div className="chat-cards">
                        {allUserArr.map((user, index) => (
                            <User_Card user={user} usr_arr={setSelectedUsers} key={index} />
                        ))}
                    </div>
                </div>)}

            {/* {console.log(selectedChat)} */}
            {!selectedChat ?

                (<div className="chat">
                    Click on a chat to start Conversation
                </div>)

                :

                (<div className="chat">
                    <div className="chat-head-bar">
                        <div className='chat-person-icon'></div>

                        <div className="chat-name-and-status">
                            <div className="chat-name">
                                Rahul Singh
                            </div>

                            <div className="chat-status">
                                <div className="chat-status-icon"></div>
                                <div className="chat-status-message">online</div>
                            </div>
                        </div>
                        <button className="chat-info" onClick={() => { setShowChatDropDown(!showChatDropDown) }}> <BsThreeDotsVertical /></button>
                        {!!showChatDropDown &&
                            <div className="chat-drop-down" style={{ 'float': 'right', 'marginRight': '70px' }}>
                                <button onClick={onDeleteChat}>Delete Chat</button>
                                <button onClick={onClearChat}>Clear all messages</button>
                            </div>
                        }

                    </div>

                    <div className="chat-main">
                        {selectedChat.messages?.length === 0 ? (
                            <div>Start some chat</div>
                        ) : (
                            selectedChat.messages?.length > 0 && selectedChat.messages.map((message, index) => (
                                <Chatting_Box key={index} message={message} />
                            ))
                        )}
                    </div>

                    <div className="chat-message-footer">
                        <BsPaperclip />
                        <input type="text" className="class-message-input-box" placeholder="Type your Message..." value={inputMessageValue} onChange={(event) => { setInputMessageValue(event.target.value) }} onKeyDown={(event) => { if (event.key == 'Enter') { onMessageSend(); setInputMessageValue(""); event.target.value = "" } }} />
                        <BsEmojiSmile />
                        <button onClick={() => { onMessageSend(); setInputMessageValue("") }}> <BsFillSendFill /></button>
                    </div>
                </div>)}
        </div>

    );
};

export default Chat_Page;
