class ErrorService {
  static getErrorMessage(e) {
    return e.response?.data?.message || 'Gagal memproses';
  }
}

export default ErrorService;
