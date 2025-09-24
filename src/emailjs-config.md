# EmailJS Configuration Guide

## Setup Instructions

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: Chào mừng {{user_name}} đến với Study VHU!

Xin chào {{user_name}},

Cảm ơn bạn đã đăng ký tham gia Study VHU! Chúng tôi rất vui mừng chào đón bạn vào cộng đồng học tập thông minh.

Thông tin đăng ký của bạn:
- Họ và tên: {{user_name}}
- Email: {{user_email}}
- Số điện thoại: {{user_phone}}
- Năm học: {{year_of_study}}
- Chuyên ngành: {{major}}
- Trường đại học: {{university}}
- Sở thích: {{interests}}
- Ngày đăng ký: {{registration_date}}

Những gì bạn sẽ nhận được:
✅ Truy cập miễn phí các công cụ học tập thông minh
✅ Tài liệu học tập được tuyển chọn kỹ lưỡng
✅ Hỗ trợ AI cho việc học tập
✅ Cộng đồng sinh viên năng động
✅ Cập nhật về các tính năng mới

Chúng tôi sẽ liên hệ với bạn sớm để hướng dẫn sử dụng nền tảng.

Trân trọng,
Đội ngũ Study VHU

---
Study VHU - Nền tảng học tập thông minh cho sinh viên VHU
Website: https://studyvhu.com
Email: support@studyvhu.com
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abcdefghijk`)

### 5. Update Configuration
Replace the placeholder values in `src/components/Registration/RegistrationForm.tsx`:

```typescript
// Replace these with your actual EmailJS values
const serviceId = 'YOUR_SERVICE_ID';        // e.g., 'service_abc123'
const templateId = 'YOUR_TEMPLATE_ID';      // e.g., 'template_xyz789'  
const publicKey = 'YOUR_PUBLIC_KEY';        // e.g., 'user_abcdefghijk'
```

### 6. Test the Integration
1. Fill out the registration form on your website
2. Submit the form
3. Check if the email is sent successfully
4. Verify the email content and formatting

## Template Variables Available

The following variables are automatically passed to your EmailJS template:

- `{{to_name}}` - Recipient name
- `{{to_email}}` - Recipient email
- `{{user_name}}` - User's full name
- `{{user_email}}` - User's email address
- `{{user_phone}}` - User's phone number
- `{{year_of_study}}` - Selected year of study
- `{{major}}` - Selected major/field of study
- `{{university}}` - University name
- `{{interests}}` - Comma-separated list of interests
- `{{registration_date}}` - Registration date in Vietnamese format

## Troubleshooting

### Common Issues:
1. **Email not sending**: Check your service configuration and credentials
2. **Template not found**: Verify your template ID is correct
3. **Rate limiting**: EmailJS free plan has sending limits
4. **CORS errors**: Make sure your domain is added to EmailJS allowed origins

### Testing:
- Use EmailJS dashboard's "Test" feature to verify templates
- Check browser console for error messages
- Verify all required template variables are being passed

## Security Notes
- Never expose your private key in frontend code
- Use environment variables for sensitive configuration in production
- Consider implementing server-side validation for production use
- Monitor your EmailJS usage to avoid exceeding limits

## Upgrade Considerations
- Free plan: 200 emails/month
- Paid plans available for higher volume
- Consider implementing email verification for production