import React from "react";

export const Conversation = ({ conversation }) => {
  console.log(conversation)
  return (
    <div className="conversation">
      {conversation && (
        <>
          <img src={conversation.otherMember?.avatar} />
          {conversation?.messages.map((message) => {
            return (
              <div key={message._id}>
                <p>{message.content}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
