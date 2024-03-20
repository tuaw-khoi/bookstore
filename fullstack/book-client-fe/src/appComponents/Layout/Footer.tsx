import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="flex space-x-40 justify-center border-t-2 border-gray-300  w-full bg-gray-200 py-5">
        <div>
          <h4>HỖ TRỢ KHÁCH HÀNG</h4>
          <div className="flex flex-col">
            <Link to={""}>Kỹ thuật & Bảo hành</Link>
            <Link to={""}>Sản Phẩn & Đơn Hàng</Link>
          </div>
        </div>
        <div>
          <h4>TRỢ GIÚP</h4>
          <div className="flex flex-col">
            <Link to={""}>Hướng dẫn mua hàng</Link>
            <Link to={""}>Phương thức thanh toán</Link>
            <Link to={""}>Phương thức vận chuyển</Link>
            <Link to={""}>Chính sách đổi - trả</Link>
            <Link to={""}>Chính sách bồi hoàn</Link>
            <Link to={""}>Câu hỏi thường gặp (FAQs)</Link>
          </div>
        </div>
        <div>
          <h4>TÀI KHOẢN CỦA BẠN</h4>
          <div className="flex flex-col">
            <Link to={""}>Cập nhật tài khoản</Link>
            <Link to={""}>Giỏ hàng</Link>
            <Link to={""}>Lịch sử giao dịch</Link>
            <Link to={""}>Sản phẩm yêu thích</Link>
            <Link to={""}>Kiểm tra đơn hàng</Link>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
