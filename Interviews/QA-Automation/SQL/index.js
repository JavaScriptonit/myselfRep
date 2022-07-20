/*
// https://www.sql-practice.com/ - sql practice
// https://www.youtube.com/watch?v=p3qvj9hO_Bo - Learn SQL In 60 Minutes

// Вывести уникальные значения из 1ой таблицы:
SELECT DISTINCT column1, column2, ...
FROM table_name;

// Вывести таблицу с 4 колонками из 2ух таблиц, объединенных по id:
SELECT customers.id, customers.name, items.name, items.cost
FROM customers, items
WHERE customers.id=seller_id
ORDER BY customers.id

SELECT items.item_description, items.item_cost, vendors.vendor_name, vendors.city
FROM vendors, items
WHERE vendors.vendor_id=items.primary_vendor_id
ORDER by vendors.vendor_name

// Объединить таблицы по id и вывести только определенного вендора с сортировкой по вендору:
SELECT * from items
join vendors on items.primary_vendor_id = vendors.vendor_id
where vendors.vendor_name = 'AMF Medical Corp.' or vendors.vendor_name = 'American Medical Specialities'
order by vendors.vendor_name

// LEFT JOIN - отличие для вывода значений из 1ой таблицы items (выводятся все, даже если нет id)
// RIGHT JOIN - вывод всех значений на 2ой таблицы vendors
// FULL OUTER JOIN - выводит все значения из 2 таблиц

// Вывести определенную (AVG/MIN/MAX/SUM/COUNT) цену препаратов:
SELECT avg(items.item_cost)
from items

// Вывести id препаратов и кол-во препаратов объединенное по цене и сортированное по id
SELECT items.item_id, count(items.item_cost)
from items
Group by items.item_cost
order by items.item_id





















 */
