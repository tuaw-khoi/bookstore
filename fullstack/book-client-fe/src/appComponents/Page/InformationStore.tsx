const InformationStore = () => {
  return (
    <div className="bg-white rounded-xl container justify-center px-44 space-y-5 pb-4">
      <h3 className="border-b-2 pb-2 border-gray-300 mb-5 text-orange-600 text-[30px]">
        Giới thiệu KenzoNBook
      </h3>
      <p>
        KenzoNBook là <strong>nhà sách Trực tuyến</strong>, đối tác chính thức
        của hơn 20 công ty, nhà phát hành sách hàng đầu Việt Nam: NXB Trẻ, NXB
        Kim Đồng, Nhã Nam, Alphabooks, First News,...với số lượng đầu sách đồ sộ
        được cập nhật liên tục hàng ngày. Ngoài mua sách online tại KenzoNBook,
        bạn còn có rất nhiều lựa chọn quà tặng, văn phòng phẩm, đồ chơi, vật
        dụng gia đình, công nghệ với giá niêm yết luôn bằng hoặc thấp hơn giá
        thị trường giúp bạn tiết kiệm rất nhiều thời gian mua sắm.
      </p>
      <img
        className="h-[350px] w-full object-contain"
        src="src\assest\img\book-banner\5064602.jpg"
        alt=""
      />
      <h3 className="font-medium">
        Mua sắm trực tuyến tại KenzoNBook, bạn được:
      </h3>
      <ol className="space-y-3">
        <li>- Giảm giá ưu đãi cho Khách hàng</li>
        <li>- Giao hàng trong vòng nhanh chóng</li>
        <li>- Thanh toán an toàn, tiện lợi</li>
        <li>- Dịch vụ hậu mãi chu đáo, tận tình.</li>
      </ol>
      <h3 className="font-medium">NHÀ SÁCH TRỰC TUYẾN BOOKBUY</h3>
      <p>Địa chỉ: 9 Lý Văn Phức, Tân Định, Q1, TP.HCM</p>
      <p>Email: info@kenzonbook.vn</p>
      <p>
        Điện thoại: (08)- 38207153 (giờ hành chính) - 0933 109 009 (hotline)
      </p>
    </div>
  );
};

export default InformationStore;
