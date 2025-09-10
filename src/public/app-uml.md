### UML-диаграмма приложения

```mermaid
classDiagram
    %% Интерфейсы
    class IProduct {
        <<interface>>
        +string id
        +string description
        +string image
        +string title
        +string category
        +PriceType price
    }

    class ICatalog {
        <<interface>>
        +IProduct[] items
        +IProduct selectedItem
        +addItems(IProduct[] items) void
        +getItemById(string id) IProduct
    }

    class IBasket {
        <<interface>>
        +IProduct[] items
        +number itemCount
        +PriceType total
        +addItem(IProduct item) void
        +delItemById(string id) void
    }

    class IBuyer {
        <<interface>>
        +TPaymentType payment
        +string email
        +string phone
        +string address
    }

    class IApi {
        <<interface>>
        +get(uri: string) Promise~T~
        +post(uri: string, data: object, method?: ApiPostMethodsType) Promise~T~
    }

    class ILarekProducts {
        <<interface>>
        +number total
        +IProduct[] items
    }

    class IOrderData {
        <<interface>>
        +TPaymentType payment
        +string email
        +string phone
        +string address
        +PriceType total
        +string[] items
    }

    class IPurchaseData {
        <<interface>>
        +string[] id
        +PriceType total
    }

    %% Типы
    class PriceType {
        <<type>>
        number | null
    }

    class TPaymentType {
        <<type>>
        "online" | "cash" | undefined
    }

    class StorageType {
        <<type>>
        Object with IProduct values
    }

    class ApiPostMethodsType {
        <<type>>
        POST, PUT, DELETE
    }

    %% Классы
    class Catalog {
        -StorageType _items
        -IProduct _selectedItem
        +Catalog(items?: StorageType)
        +IProduct[] items
        +IProduct selectedItem
        +addItems(IProduct[] items) void
        +getItemById(string id) IProduct
    }

    class Basket {
        -StorageType _items
        +IProduct[] items
        +number itemCount
        +PriceType total
        +addItem(IProduct? item) void
        +delItemById(string id) boolean
        +hasItem(string id) boolean
        +clear() void
    }

    class Buyer {
        -TPaymentType _payment
        -string _email
        -string _phone
        -string _address
        +Buyer(buyer?: Partial~IBuyer~)
        +TPaymentType payment
        +string email
        +string phone
        +string address
        +clear() void
        +isEmailValid() string
        +isPhoneValid() string
        +isAddressValid() string
        +isPaymentValid() string
        +isAllValid() boolean
    }

    class LarekAPI {
        -IApi _api
        +LarekAPI(api: IApi)
        +getShopProducts() Promise~ILarekProducts~
        +placeOrder(orderData: IOrderData) Promise~IPurchaseData~
    }

    %% Наследование интерфейсов
    IOrderData --|> IBuyer

    %% Реализация интерфейсов
    Catalog ..|> ICatalog
    Basket ..|> IBasket
    Buyer ..|> IBuyer

    %% Ассоциации
    Basket "1" -- "*" IProduct : contains
    Catalog "1" -- "*" IProduct : contains
    LarekAPI "1" -- "1" IApi : uses

    %% Зависимости
    Basket ..> StorageType
    Catalog ..> StorageType
    IOrderData ..> TPaymentType
    IOrderData ..> PriceType
    IPurchaseData ..> PriceType
    IProduct ..> PriceType
    Buyer ..> TPaymentType
    
    %% Связи LarekAPI с возвращаемыми типами
    LarekAPI ..> ILarekProducts : returns from getShopProducts()
    LarekAPI ..> IPurchaseData : returns from placeOrder()
    LarekAPI ..> IOrderData : accepts in placeOrder()
    
    %% Связи IApi с типами
    IApi ..> ApiPostMethodsType : uses in post method
    IApi ..> ILarekProducts : returns in get
    
    %% Связи ILarekProducts с IProduct
    ILarekProducts "1" -- "*" IProduct : contains items

    %% Композиция
    IOrderData *-- IBuyer : extends
```
