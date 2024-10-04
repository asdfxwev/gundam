// import './HeaderSearch.css'
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useLocation } from 'react-router-dom';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';


// export default function HeaderSearch({menuAnimating, menuClosing, smallTopMenu}) {

//     const [content, setContent]  = useState('');
//     const location = useLocation();

//     const isMainPage = location.pathname !== '/';



//     function onChangeContent (e) {
//         setContent(e.target.value);
//     }

//     function onSubmit (e) {
//         e.preventDefault();
//         setContent('');
//     }

//     function onKeyDownContent (e) {
//         if (e.keyCode === 13) {
//             onSubmit(e);
//         }
//     }

//     return (
//         <div className={`searchMenu ${isMainPage ? 'absolute' : ''} ${menuAnimating ? 'menuAnimation' : ''} ${menuClosing ? 'menuClosing' : ''} ${smallTopMenu ? 'smallMenu' : ''}`}>
//             <form className={`headerForm ${menuAnimating ? 'menuAnimation' : ''} ${menuClosing ? 'menuClosing' : ''} ${smallTopMenu ? 'smallMenu' : ''}`}>
//                 <input className={`headerSearchInput ${menuAnimating ? 'searchMenuAnimation' : ''} ${menuClosing ? 'searchMenuClosing' : ''}`} type="text" value={content} onChange={onChangeContent} onKeyDown={onKeyDownContent} placeholder='검색어를 입력해라' />
//                 <button className={`header_Search ${menuAnimating ? 'searchMenuAnimation' : ''} ${menuClosing ? 'searchMenuClosing' : ''}`} onClick={onSubmit}><FontAwesomeIcon icon={faSearch} /></button>
//             </form>
//         </div>
//     )
// }