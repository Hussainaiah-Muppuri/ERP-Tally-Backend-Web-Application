package com.stockitem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stockitem.entity.StockItemEntity;
import com.stockitem.repo.StockItemRepository;

@Service
public class StockItemServiceImpl implements StockItemService {
    @Autowired
    private StockItemRepository stockItemRepo;

    @Override
    public ResponseEntity<String> save(StockItemEntity item) {
        stockItemRepo.save(item);
        return ResponseEntity.ok("Item saved successfully");
    }

    @Override
    public ResponseEntity<StockItemEntity> update(Long stockItemId, StockItemEntity updateItem) {
        updateItem.setStockItemId(stockItemId);
        StockItemEntity result = stockItemRepo.save(updateItem);
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<String> deleteById(Long stockItemId) {
        stockItemRepo.deleteById(stockItemId);
        return ResponseEntity.ok("Item deleted successfully");
    }

    @Override
    public List<StockItemEntity> saveAll(List<StockItemEntity> items) {
        return stockItemRepo.saveAll(items);
    }

    @Override
    public Optional<StockItemEntity> getById(Long stockItemId) {
        return stockItemRepo.findById(stockItemId);
    }

    @Override
    public List<StockItemEntity> getByUserIdAndCompanyId(Long userId, Long companyId) {
        return stockItemRepo.findByUserIdAndCompanyId(userId, companyId);
    }
}
