import { useEffect, useState } from "react";
import { Pencil, Save, X, Eye, EyeOff, Upload } from "lucide-react";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const binaryData = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const decodedText = new TextDecoder("utf-8").decode(binaryData);
    return JSON.parse(decodedText);
  } catch (e) {
    console.error("Lỗi phân tích token:", e);
    return null;
  }
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Chưa đăng nhập hoặc token không tồn tại");
      return;
    }

    const decoded = parseJwt(token);
    if (!decoded) {
      setError("Token không hợp lệ");
      return;
    }

    console.log("Payload của token:", decoded);

    const roles = decoded.scope || [];
    const profileData = {
      UserId: decoded.sub || "Không xác định",
      UserName: decoded.sub || "Không xác định",
      Email: decoded.email || "Không có email",
      Status: "Hoạt động",
      Gender: decoded.gender || "Không xác định",
      DOB: decoded.dob || "", // Không cần parse Date nếu dob là chuỗi yyyy-MM-dd
      Role: Array.isArray(roles) ? roles.join(", ") : roles || "Không có vai trò",
    };
    setUserInfo(profileData);
    setForm(profileData);
  }, []);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < minLength) {
      return "Mật khẩu phải có ít nhất 8 ký tự.";
    }
    if (!hasNumber.test(password)) {
      return "Mật khẩu phải chứa ít nhất một số.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.";
    }
    return null;
  };

  const validateDOB = (dob) => {
    const date = new Date(dob);
    const today = new Date();
    const minAge = 13; // Tối thiểu 13 tuổi
    const maxAge = 120;
    const age = today.getFullYear() - date.getFullYear();
    if (isNaN(date.getTime())) {
      return "Ngày sinh không hợp lệ.";
    }
    if (date > today) {
      return "Ngày sinh không được là tương lai.";
    }
    if (age < minAge) {
      return `Bạn phải ít nhất ${minAge} tuổi.`;
    }
    if (age > maxAge) {
      return `Ngày sinh không hợp lý.`;
    }
    return null;
  };

  const handleEdit = () => {
    setForm({ ...userInfo });
    setEditMode(true);
    setMessage("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({ ...userInfo });
    setAvatar(null);
    setAvatarUrl(userInfo.avatarUrl || null);
    setMessage("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const dobError = validateDOB(form.DOB);
    if (dobError) {
      setMessage(dobError);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMessage("Chưa đăng nhập hoặc token không tồn tại");
        setIsLoading(false);
        return;
      }

      const userUpdateDTO = {
        userName: form.UserName,
        gender: form.Gender,
        dob: form.DOB,
      };
      console.log("Sending userUpdateDTO:", userUpdateDTO);

      const response = await fetch("http://localhost:8080/api/v1/user/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdateDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(
          `Lỗi ${response.status}: ${errorData.message || "Không thể cập nhật thông tin."}`
        );
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      if (data.result) {
        localStorage.setItem("accessToken", data.result);
        const decoded = parseJwt(data.result);
        setUserInfo({
          ...userInfo,
          UserName: decoded.sub || userInfo.UserName,
          Gender: decoded.gender || userInfo.Gender,
          DOB: decoded.dob || userInfo.DOB,
          Email: decoded.email || userInfo.Email,
        });
        setForm({
          ...form,
          UserName: decoded.sub || form.UserName,
          Gender: decoded.gender || form.Gender,
          DOB: decoded.dob || form.DOB,
          Email: decoded.email || form.Email,
        });
      }
      setEditMode(false);
      setAvatar(null);
      setAvatarUrl(null);
      setMessage("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      setMessage("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage("Vui lòng chọn file ảnh hợp lệ.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB.");
        return;
      }
      setAvatar(file);
      setAvatarUrl(URL.createObjectURL(file));
      setMessage("Đã chọn ảnh đại diện mới (chưa lưu)");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin đổi mật khẩu.");
      setIsLoading(false);
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("Mật khẩu mới không khớp.");
      setIsLoading(false);
      return;
    }
    const passwordError = validatePassword(passwordForm.newPassword);
    if (passwordError) {
      setMessage(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMessage("Chưa đăng nhập hoặc token không tồn tại");
        setIsLoading(false);
        return;
      }

      console.log("Sending password update:", {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });

      const response = await fetch("http://localhost:8080/api/v1/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(
          `Lỗi ${response.status}: ${errorData.message || "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại."}`
        );
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setMessage(data.result || "Đổi mật khẩu thành công!");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setShowChangePassword(false);
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      setMessage("Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  if (!userInfo) {
    return (
      <div className="text-gray-600 text-center py-4">
        Đang tải thông tin...
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-start bg-gradient-to-br from-indigo-50 to-purple-100 py-2 px-2">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-0 md:p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-14 py-6 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <img
              src={
                avatarUrl ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                  userInfo.UserName
                )}`
              }
              alt="Avatar"
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
            />
            {editMode && (
              <label className="absolute bottom-2 right-2 bg-white hover:bg-indigo-100 text-indigo-600 rounded-full p-2 cursor-pointer shadow transition border border-indigo-200">
                <Upload size={22} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isLoading}
                />
              </label>
            )}
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="font-bold text-3xl text-white mb-1">
              {userInfo.UserName}
            </div>
            <div className="text-indigo-100 text-lg mb-2">{userInfo.Email}</div>
            <div className="flex gap-2 mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${
                  userInfo.Status === "Hoạt động"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {userInfo.Status}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                {userInfo.Role}
              </span>
            </div>
          </div>
        </div>
        {message && (
          <div className="mb-4 px-6 py-3 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center justify-between text-base">
            <span>{message}</span>
            <button
              onClick={() => setMessage("")}
              className="ml-2 text-yellow-700 hover:text-yellow-900"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <form onSubmit={handleSave} className="space-y-8 px-10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Họ tên
              </label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  value={form.UserName || ""}
                  onChange={(e) =>
                    setForm({ ...form, UserName: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              ) : (
                <div className="text-gray-800 font-semibold">
                  {userInfo.UserName || "Không xác định"}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <div className="text-gray-800 font-semibold">
                {userInfo.Email || "Không có email"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Giới tính
              </label>
              {editMode ? (
                <select
                  className="w-full border rounded-lg px-3 py-2 bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  value={form.Gender || "Không xác định"}
                  onChange={(e) => setForm({ ...form, Gender: e.target.value })}
                  disabled={isLoading}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                  <option value="Không xác định">Không xác định</option>
                </select>
              ) : (
                <div className="text-gray-800 font-semibold">
                  {userInfo.Gender || "Không xác định"}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Ngày sinh
              </label>
              {editMode ? (
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 bg-indigo-50 focus:ring-2 focus:ring-indigo-500"
                  value={form.DOB || ""}
                  onChange={(e) => setForm({ ...form, DOB: e.target.value })}
                  required
                  disabled={isLoading}
                />
              ) : (
                <div className="text-gray-800 font-semibold">
                  {userInfo.DOB || "Không xác định"}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-2 pt-4">
            <button
              type="button"
              className="px-2 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors font-medium flex items-center gap-1 text-sm"
              onClick={() => setShowChangePassword(!showChangePassword)}
              disabled={isLoading}
            >
              Đổi mật khẩu
            </button>
            {editMode ? (
              <>
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors font-medium flex items-center gap-1 text-sm"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X size={16} /> Hủy
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium flex items-center gap-1 text-sm"
                  disabled={isLoading}
                >
                  <Save size={16} /> {isLoading ? "Đang lưu..." : "Lưu"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="px-2 py-1 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-colors font-medium flex items-center gap-1 text-sm"
                onClick={handleEdit}
                disabled={isLoading}
              >
                <Pencil size={16} /> Chỉnh sửa
              </button>
            )}
          </div>
        </form>
        {showChangePassword && (
          <div className="mt-4 max-w-md mx-auto bg-indigo-50 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">
              Đổi mật khẩu
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Mật khẩu cũ
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                    value={passwordForm.oldPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        oldPassword: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Mật khẩu mới
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  onClick={() => setShowChangePassword(false)}
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Đổi mật khẩu"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;