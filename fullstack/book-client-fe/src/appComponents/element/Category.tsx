const Category = () => {
  return (
    <div>
      <ul className="space-y-5 my-2">
        <li className="px-5 py-1 cursor-pointer hover:bg-gray-500 ">
          Sách Giáo Khoa
        </li>
        <li className="px-5 py-1 cursor-pointer hover:bg-gray-500">
          Truyện Tranh - Sách Thiếu Nhi
        </li>
        <li className="px-5 py-1 cursor-pointer hover:bg-gray-500">Kinh Tế</li>
        <li className="px-5 py-1 cursor-pointer hover:bg-gray-500">
          Tâm Lí - Kĩ Năng Sống
        </li>
        <li className="px-5 py-1 cursor-pointer hover:bg-gray-500">Khác</li>
      </ul>
    </div>
  );
};

export default Category;
