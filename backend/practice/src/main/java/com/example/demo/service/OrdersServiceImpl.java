package com.example.demo.service;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.domain.OrderItemDTO;
import com.example.demo.domain.OrderRequestDTO;
import com.example.demo.domain.OrderStatisticDTO;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Code;
import com.example.demo.entity.Orders;
import com.example.demo.entity.User;
import com.example.demo.repository.CodeDSLRepository;
import com.example.demo.repository.CartDSLRepository;
import com.example.demo.repository.ProductDSLRespository;
import com.example.demo.entity.Img;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Product;
import com.example.demo.entity.Oritems;
import com.example.demo.entity.Review;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.ReviewDSLRepository;
import com.example.demo.repository.ImgDSLRepository;
import com.example.demo.repository.OrdersDSLRepository;
import com.example.demo.repository.OrdersItemDSLRepository;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.OritemsRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.querydsl.core.Tuple;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepository ordersRepository;
    private final OrdersDSLRepository ordersDSLRepository;
    private final UserRepository userRepository;
    private final CodeDSLRepository codeDSLRepository; 
    private final ImgDSLRepository imgDSLRepository;
    private final ReviewDSLRepository reDSLRepository;
    private final OrdersItemDSLRepository oritemDSLRepository;
    private final OritemsRepository oritemRepository;
	private final ProductRepository prepository;
	private final ProductDSLRespository pDSLrepository;
	private final CartDSLRepository cartDSLrepository;
	
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

//    @Override
//    public List<OrdersDTO> getOrders(String userId, String orderStatus) {
//        List<Orders> ordersList = ordersDSLRepository.findOrdersByDynamicCondition(userId, orderStatus);
//        return ordersList.stream()
//            .map(order -> new OrdersDTO(
//                order.getOrder_id(),
//                order.getUser().getUser_id(),
//                order.getOrder_date(),
//                order.getOrder_status(),
//                order.getPostcode(),
//                order.getOritem_address(),
//                order.getOritem_dtladdress(),
//                order.getOritem_name(),
//                order.getOritem_number(),
//                order.getPay_method(),
//                order.getOritem_payment(),
//                order.getOritem_count()))
//            .collect(Collectors.toList());
//    }

    @Transactional
    @Override
    public void createOrder(OrdersDTO orderDto) {
    	
    	List<String> orderIds = ordersRepository.findAllOrderIds();
    	String year = Integer.toString( LocalDate.now().getYear()).substring(2);
    	String month = Integer.toString(LocalDate.now().getMonthValue());
    	String day = Integer.toString(LocalDate.now().getDayOfMonth());
    	
    	String orderId = orderIds.stream().map(id -> id.substring(16))
    			.map(Integer::parseInt)
    			.max(Comparator.naturalOrder())
    			.map(String::valueOf)
    			.orElse("NoData");
    	System.out.println("orderId"+orderId);
    	if (orderId == "NoData") {
			orderDto.setOrder_id(year+month+day+orderDto.getUser_id()+"0001");
		} else {
			int nextOrderId = Integer.parseInt(orderId) + 1;
			System.out.println("nextOrderId" +nextOrderId);
			
			String nextId = String.format("%04d", nextOrderId);
			System.out.println("nextId"+nextId);
			orderDto.setOrder_id(year+month+day+orderDto.getUser_id()+nextId);
		}
    	System.out.println("orderid = "+orderDto.getOrder_id());
    	// order_id 처리, orderdate 처리
        User user = userRepository.findById(orderDto.getUser_id())
            .orElseThrow(() -> new RuntimeException("User not found"));

        Orders orders = Orders.builder()
            .order_id(orderDto.getOrder_id())
            .user(user)
            .order_date(LocalDateTime.now())
            .order_status("order_cd01")
            .postcode(orderDto.getPostcode())
            .oritem_address(orderDto.getOritem_address())
            .oritem_dtladdress(orderDto.getOritem_dtladdress())
            .oritem_name(orderDto.getOritem_name())
            .oritem_number(orderDto.getOritem_number())
            .pay_method(orderDto.getPay_method())
            .oritem_payment(orderDto.getOritem_payment())
            .oritem_count(orderDto.getOritem_count())
            .build();

        ordersRepository.save(orders);
        System.out.println("orders = " +orders);
        
        
        for (OrderItemDTO item : orderDto.getItems()) {
            // 각 아이템을 처리하는 로직
            // 예: orderItemService.createOrderItem(item);
        	 Product product = prepository.findById(item.getPro_id())
                     .orElseThrow(() -> new RuntimeException("Product not found")); // 적절한 예외 처리
        	Oritems oritems = Oritems.builder()
        			.order_id(orders)
        			.pro_id(product)
        			.oritem_quan(item.getOritem_quan())
        			.build();
        	
//        	oritemDSLRepository.insertOrderItems(item);
        	oritemRepository.save(oritems);
        	
        	Cart cart = Cart.builder()
        			.user_id(orderDto.getUser_id())
        			.pro_id(item.getPro_id())
        			.build();
        	cartDSLrepository.deleteCart(cart);
        	
//        	int pro_stock = pDSLrepository.findbyproStock(item.getPro_id());
        	
        	pDSLrepository.updateStock(oritems);
        	
        }
        
//        for (int i = 0; i < orderDto.getItems(); i++) {
//			
//		}
        
//        Oritems oritems = Oritems.builder()
//        		.order_id(orderDto.getOrder_id())
//        		.pro_id(null);
    }

    
    @Override
    public Map<String, Object> orderList(String userId) {
    	
    	List<String> orderlist = ordersDSLRepository.searchOrderId(userId);
    	
    	List<Oritems> list = ordersDSLRepository.orderList(orderlist);
        // pro_id 추출
        List<String> proId = list.stream()
            .map(oritem -> oritem.getPro_id().getPro_id()) 
            .collect(Collectors.toList());
        
    	System.out.println(proId);
    	List<Img> imgList = imgDSLRepository.orderImgList(proId);
    	List<Review> reviewList = reDSLRepository.booleanOne(userId);
    	System.out.println("orderlist = "+list);
    	System.out.println("reviewlist = "+reviewList);
    	Map<String, Object> orderitems = new HashMap< >();
    	orderitems.put("orderList", list);
    	orderitems.put("imgList", imgList);
    	orderitems.put("reviewList", reviewList);
    	
    	return orderitems;
    }
    
    
    @Override
    public List<String> searchOrderId(String userId) {
        return ordersDSLRepository.searchOrderId(userId);
    }
    public List<String> getOrderStatusCodes() {
        List<Code> codes = codeDSLRepository.findByCodeValue("order_status");
        System.out.println("Fetched Codes: " + codes); // 추가된 로그

        return codes.stream()
            .filter(code -> code.getCode_id().equals("order_cd01"))
            .peek(code -> System.out.println("Filtered Code: " + code)) // 추가된 로그
            .map(Code::getCode_id)
            .collect(Collectors.toList());
    }
    
    
    @Override
    public List<OrderStatisticDTO> statisticList() {
    	
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	Calendar c1 = Calendar.getInstance();
    	c1.add(Calendar.DATE,1);
    	String nextDay = sdf.format(c1.getTime());
    	c1.add(Calendar.DATE, -31);
    	String lastDay = sdf.format(c1.getTime());


        // String을 LocalDateTime으로 변환
        LocalDateTime startDateTime = LocalDateTime.parse(lastDay + " 00:00:00", formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(nextDay + " 00:00:00", formatter);
    	
    	return ordersDSLRepository.statisticList(startDateTime, endDateTime);
    }
    
    @Override
    public List<OrderStatisticDTO> statisticLists(String startDate, String endDate, List<String>pro_cate, List<String>cate_brand, List<String>cate_piece) {
    	
        LocalDateTime startDateTime = LocalDateTime.parse(startDate + " 00:00:00", formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(endDate + " 00:00:00", formatter).plusDays(1);
    	
        return ordersDSLRepository.statisticSearchList(startDateTime, endDateTime, pro_cate, cate_brand, cate_piece);
    }
    

}

