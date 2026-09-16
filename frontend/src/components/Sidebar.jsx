import { PanelLeft, SquarePen, Plus } from "lucide-react";
import { useEffect } from "react";

import getconversation from "../features/getConversation";
import newChat from "../features/newChat";

import { useDispatch, useSelector } from "react-redux";

import {
  setConversations,
  addConversation,
  setSelectedConversation,
} from "../redux/conversationSlice";
import logOut from "../features/logOut";
import { setUserData } from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getconvo = async () => {
      const data = await getconversation();
      dispatch(setConversations(data));
    };

    getconvo();
  }, [dispatch, user?._id]);

  const createConversationHandler = async () => {
    const data = await newChat();
    dispatch(addConversation(data));
    dispatch(setSelectedConversation(data));
  };

  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );
  const { user } = useSelector((state) => state.user);

  return (
    <aside className="w-[250px] h-screen bg-[#0b0c12] border-r border-[#1c1d25] flex flex-col">
      <div className="h-[60px] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PanelLeft size={20} strokeWidth={1.8} className="text-gray-400" />

          <span className="text-[16px] font-medium text-white">jaatGPT</span>

          <span className="text-[10px] px-2 py-[2px] rounded-full bg-[#19132f] text-[#8b5cf6]">
            free
          </span>
        </div>

        <button
          onClick={createConversationHandler}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <SquarePen size={17} strokeWidth={1.8} />
        </button>
      </div>

      <div className="px-2 mt-2">
        <button
          onClick={createConversationHandler}
          className="
            w-full
            h-[45px]
            rounded-[10px]
            flex
            items-center
            justify-center
            gap-2
            text-white
            text-[14px]
            font-medium
            bg-gradient-to-r
            from-[#6d28d9]
            to-[#7c3aed]
            hover:from-[#7c3aed]
            hover:to-[#8b5cf6]
            transition-all
            duration-200
            shadow-[0_0_20px_rgba(124,58,237,0.15)]
          "
        >
          <Plus size={18} strokeWidth={2} />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 mt-5 scrollbar-thin scrollbar-thumb-[#2a2b35] scrollbar-track-transparent">
        <div className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-500">
          Recent
        </div>

        {conversations.length === 0 ? (
          <div className="px-3 py-4 text-gray-500 text-sm">
            No recent conversations
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conv) => {
              const isActive = conv?._id === selectedConversation?._id;

              return (
                <div
                  key={conv._id}
                  onClick={() => dispatch(setSelectedConversation(conv))}
                  className={`
                    group
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    cursor-pointer
                    transition-all
                    duration-150
                    text-sm
                    truncate

                    ${
                      isActive
                        ? "bg-[#1d1a29] text-white"
                        : "text-gray-400 hover:bg-[#15161e] hover:text-gray-200"
                    }
                  `}
                >
                  <div className="truncate">
                    {conv.title || conv.name || "New Conversation"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ________________________________________________________________________________________________________ */}
      <div className="px-2 pb-3 pt-2 border-t border-[#1c1d25]">
        <div
          className="
      w-full
      h-[64px]
      px-3
      rounded-[11px]
      bg-[#11121a]
      border border-[#1c1d25]
      flex
      items-center
      gap-3
      transition-all
      duration-200
      hover:bg-[#151620]
      hover:border-[#292a35]
    "
        >
          <div
            className="
        w-[38px]
        h-[38px]
        rounded-[10px]
        overflow-hidden
        bg-[#1c1d27]
        flex
        items-center
        justify-center
        shrink-0
      "
          >
            <img
              src={user.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-gray-200 truncate">
              {user?.name || "user"}
            </p>

            <p className="text-[11px] text-gray-500 mt-[2px]">Free Plan</p>
          </div>
          <button
            className="
        w-[32px]
        h-[32px]
        rounded-[9px]
        flex
        items-center
        justify-center
        bg-[#191a24]
        border border-[#252631]
        text-gray-400
        hover:text-white
        hover:bg-[#22232e]
        hover:border-[#343541]
        transition-all
        duration-150
        shrink-0
      "
          >
            <span className="text-[15px]">⚙</span>
          </button>
          <button
            onClick={() => {
              logOut();
              dispatch(setUserData(null));
            }}
            className="
        w-[28px]
        h-[32px]
        flex
        items-center
        justify-center
        text-gray-500
        hover:text-red-400
        transition-colors
        duration-150
        shrink-0
      "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
