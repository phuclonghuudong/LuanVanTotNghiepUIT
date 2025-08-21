const LoadingPage = ({ text = "Đang tải dữ liệu..." }) => {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
};
export default LoadingPage;
