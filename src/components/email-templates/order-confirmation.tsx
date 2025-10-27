// components/email-templates/order-confirmation.tsx
import * as React from 'react'

interface OrderConfirmationEmailProps {
  orderNumber: string
  customerName: string
  orderDate: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
  }
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  orderNumber,
  customerName,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
}) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #262626 0%, #404040 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .logo {
            max-width: 200px;
          }
          .content {
            padding: 40px 20px;
          }
          .order-number {
            background-color: #FFD100;
            color: #262626;
            padding: 15px;
            border-radius: 12px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #262626;
          }
          .item {
            display: flex;
            justify-content: space-between;
            padding: 15px;
            background-color: #fafafa;
            border-radius: 8px;
            margin-bottom: 10px;
          }
          .totals {
            border-top: 2px solid #e5e5e5;
            padding-top: 20px;
            margin-top: 20px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            font-size: 16px;
          }
          .total-final {
            font-size: 24px;
            font-weight: bold;
            color: #262626;
            border-top: 2px solid #FFD100;
            padding-top: 15px;
            margin-top: 10px;
          }
          .button {
            display: inline-block;
            background-color: #FFD100;
            color: #262626;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            background-color: #262626;
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
            font-size: 14px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <img
              src="/images/Goodyear-Bicyle-Logo-White-500x108px.png"
              alt="Goodyear Bicycle Tires"
              className="logo"
            />
          </div>

          {/* Content */}
          <div className="content">
            <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
              Thank You for Your Order!
            </h1>
            <p style={{ fontSize: '16px', color: '#737373', marginBottom: '30px' }}>
              Hi {customerName}, we've received your order and will start processing it right away.
            </p>

            <div className="order-number">
              Order #{orderNumber}
            </div>

            {/* Order Details */}
            <div className="section">
              <div className="section-title">Order Details</div>
              {items.map((item, index) => (
                <div key={index} className="item">
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ color: '#737373', fontSize: '14px' }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row total-final">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="section">
              <div className="section-title">Shipping Address</div>
              <div style={{ padding: '15px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
                {shippingAddress.street}<br />
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
              </div>
            </div>

            {/* CTA Button */}
            <div style={{ textAlign: 'center' }}>
              <a href="#" className="button">
                Track Your Order
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Questions? Contact us at support@goodyearbike.com</p>
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#a3a3a3' }}>
              © 2025 Goodyear Bicycle Tires. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}