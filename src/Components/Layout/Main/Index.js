// import React, { Component } from 'react'
// import Chart1  from "../../../Assets/img/chart1.png"
// export default class Main extends Component {
//   render() {
//     return (
//       <div>
//         <div className='page__wrapper'>
//           <div className='-fluid'>
//               <div className='row'>
//                   <div className='col-8 border-end'>
//                       <div className=''>
//                           <div className='page__wrapper-conten'>
//                               <div className='page__content page__content_pt64'>
//                                   <div className='page__stat'>
//                                        <div className=''>
//                                         <table class="table">
//                                             <thead>
//                                               <tr>
//                                                 <th scope="col">#</th>
//                                                 <th scope="col">Product Name</th>
//                                                 <th scope="col">Price</th>
//                                                 <th scope="col">Action</th>
//                                               </tr>
//                                             </thead>
//                                             <tbody>
//                                               <tr>
//                                                 <th scope="row">1</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">2</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">3</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">4</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">5</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">6</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">7</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">8</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">9</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">10</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">11</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">12</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">13</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">14</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
//                                               <tr>
//                                                 <th scope="row">15</th>
//                                                 <td>example </td>
//                                                 <td>$1000</td>
//                                                 <td>
//                                                   <button className='btn btn-sm btn-priamry'> <i class="fas fa-pen text-muted"></i> </button>
//                                                   <button className='btn btn-sm btn-'> <i class="fas fa-trash text-muted"></i></button></td> 
//                                               </tr>
                                              
//                                             </tbody>
//                                           </table>
//                                        </div> 
//                                   </div>
//                               </div>
//                               <div className='mb-5'>
//                               <img class="sidebar__pic sidebar__pic_black" src={Chart1} alt="" />
//                               </div>
//                           </div>  
//                       </div>  
//                   </div>
//                   <div className='col-4'>
//                     <div className='rightsidebar'>  
//                         <ul class="list-group page__stat p-0 border-0">
//                           <li class="list-group-item active" aria-current="true">
//                             <div className=''>
//                             <h4 className='mb-1'> <i class="fas fa-clock me-1"></i> Trending </h4>
//                             <p className='mb-0 ps-4 small text-muted'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                             </div>  
//                           </li>
//                           <li class="list-group-item" aria-current="true">
//                             <div className=''>
//                             <h4 className='mb-1'> <i class="fas fa-clock me-1"></i> Trending </h4>
//                             <p className='mb-0 ps-4 small text-muted'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                             </div>  
//                           </li>
//                           <li class="list-group-item" aria-current="true">
//                             <div className=''>
//                             <h4 className='mb-1'> <i class="fas fa-clock me-1"></i> Trending </h4>
//                             <p className='mb-0 ps-4 small text-muted'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                             </div>  
//                           </li>
//                           <li class="list-group-item" aria-current="true">
//                             <div className=''>
//                             <h4 className='mb-1'> <i class="fas fa-clock me-1"></i> Trending </h4>
//                             <p className='mb-0 ps-4 small text-muted'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                             </div>  
//                           </li>
//                           <li class="list-group-item" aria-current="true">
//                             <div className=''>
//                             <h4 className='mb-1'> <i class="fas fa-clock me-1"></i> Trending </h4>
//                             <p className='mb-0 ps-4 small text-muted'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                             </div>  
//                           </li>
//                         </ul>
//                     </div>    
//                   </div>
//               </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }