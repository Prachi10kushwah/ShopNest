import React from "react";

const DescriptionBox = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-6">
      {/* Navigator */}
      <div className="flex">
        <div className="px-10 py-4 border border-[#d8c8bf] border-b-0 bg-[#11231e] text-white font-semibold rounded-t-xl">
          Description
        </div>

        <div className="px-10 py-4 border border-[#d8c8bf] border-b-0 bg-[#f9f3ef] text-[#666] font-medium rounded-t-xl ml-2 cursor-pointer hover:bg-white transition">
          Reviews (122)
        </div>
      </div>

      {/* Description */}
      <div className="border border-[#d8c8bf] bg-white rounded-b-xl rounded-tr-xl p-10 text-[#555] leading-8 text-[17px] space-y-6 shadow-sm">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Praesentium odit ad quo, illo earum fugiat ab non itaque
          reprehenderit architecto minima provident eligendi dolorum quis
          corporis in. Fugit voluptatum, omnis corrupti amet consequuntur
          beatae eveniet provident tempora odio quod a ipsa qui blanditiis
          asperiores dolor deleniti quo nobis temporibus voluptates facere
          possimus.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          iusto alias quia nulla veritatis odio rerum corporis omnis veniam,
          at ex hic accusantium impedit optio exercitationem minus totam
          odit? Error cupiditate mollitia esse enim.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;