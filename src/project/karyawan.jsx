export default function Karyawan({ children }) {
  return (
      <div className='wrapper'>
          <div className='header'>
              <h3>Tambah Pengguna</h3>
              <form className='input-box' type='submit'>
                  <input type='text' placeholder='Nama' />
                  <input type='email' placeholder='Email' />
                  <input type='file' placeholder='image' />
                  <button type='submit'>Simpan</button>
              </form>
          </div>
          <div className='data-pengguna'>
              <h3>Data Pengguna</h3>
              <ul>
                  <li>
                      <div>
                          Nama Pengguna <span className='email'>(email@gmail.com)</span>
                      </div>
                      <div>
                          <a href='#' className='edit'>Edit</a> - <a href='#' className='delete'>Delete</a>
                      </div>
                  </li>
              </ul>
          </div>
          {/* Menyisipkan children di sini */}
          <div>{children}</div>
      </div>
  );
}
