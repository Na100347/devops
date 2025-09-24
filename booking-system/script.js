const API_URL = 'http://localhost:3000/api/bookings'; // Đổi theo API của bạn

// Lấy danh sách đặt chỗ từ API và hiển thị
async function fetchBookings() {
  try {
    const response = await fetch(API_URL);
    const bookings = await response.json();

    const bookingList = document.getElementById('booking-list');
    bookingList.innerHTML = bookings
      .map(
        (booking) => `
        <tr>
          <td>${booking._id}</td>
          <td>${booking.customerName}</td>
          <td>${new Date(booking.date).toLocaleDateString()}</td>
          <td>${booking.time}</td>
          <td class="status-${booking.status.toLowerCase()}">${booking.status}</td>
          <td>
            <button class="btn btn-edit" onclick="editBooking('${booking._id}')">Edit</button>
            <button class="btn btn-danger" onclick="cancelBooking('${booking._id}')">Cancel</button>
          </td>
        </tr>
      `
      )
      .join('');
  } catch (err) {
    console.error('Error fetching bookings:', err);
  }
}

// Hủy đặt chỗ
async function cancelBooking(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Booking cancelled successfully');
      fetchBookings();
    } else {
      alert('Failed to cancel booking');
    }
  } catch (err) {
    console.error('Error cancelling booking:', err);
  }
}

// Sửa đặt chỗ
function editBooking(id) {
  alert(`Edit feature not implemented yet for booking ID: ${id}`);
}

// Thêm đặt chỗ mới
document.getElementById('add-booking').addEventListener('click', () => {
  alert('Redirect to add booking page (not implemented yet)');
});

// Khởi chạy
fetchBookings();
