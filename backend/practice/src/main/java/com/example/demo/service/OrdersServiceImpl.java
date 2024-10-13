package com.example.demo.service;

import com.example.demo.domain.OrdersDTO;
import com.example.demo.entity.Code;
import com.example.demo.entity.Orders;
import com.example.demo.entity.User;
import com.example.demo.repository.CodeDSLRepository;
import com.example.demo.repository.OrdersDSLRepository;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepository ordersRepository;
    private final OrdersDSLRepository ordersDSLRepository;
    private final UserRepository userRepository;
    private final CodeDSLRepository codeDSLRepository; 

    @Override
    public List<OrdersDTO> getOrders(String userId, String orderStatus) {
        List<Orders> ordersList = ordersDSLRepository.findOrdersByDynamicCondition(userId, orderStatus);
        return ordersList.stream()
            .map(order -> new OrdersDTO(
                order.getOrder_id(),
                order.getUser().getUser_id(),
                order.getOrder_date(),
                order.getOrder_status(),
                order.getPostcode(),
                order.getOritem_address(),
                order.getOritem_dtladdress(),
                order.getOritem_name(),
                order.getOritem_number(),
                order.getPay_method(),
                order.getOritem_payment(),
                order.getOritem_count()))
            .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void createOrder(OrdersDTO orderDto) {
        User user = userRepository.findById(orderDto.getUser_id())
            .orElseThrow(() -> new RuntimeException("User not found"));

        Orders orders = Orders.builder()
            .order_id(orderDto.getOrder_id())
            .user(user)
            .order_date(orderDto.getOrder_date())
            .order_status(orderDto.getOrder_status())
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




}
