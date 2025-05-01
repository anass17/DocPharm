import React, { useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Col, Collapse, Row, theme, Typography } from 'antd';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Box, Container, Typography as TP } from '@mui/material';
import { GRAY3 } from '../../config/colors';

const getItems = (panelStyle, state, handleClick) => [
  {
    key: '1',
    label: 'Registration',
    children: (
        <div className='border-l-2 border-green-500'>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="reg-1" className={state.key == 'reg-1' ? 'text-green-500' : ''} onClick={ handleClick }>What documents do I need for verification ?</p>
                <p className='hidden'>
                    To complete your verification, please prepare the following documents:<br /><br />
                    • A valid government-issued ID (e.g., passport or national ID card)<br />
                    • Proof of address (e.g., utility bill or bank statement dated within the last 3 months)<br />
                    • A clear profile picture<br />
                    • Your medical license or professional certificate (for doctors and pharmacies)<br />
                    • Business registration document (for pharmacies)<br /><br />
                    Make sure all documents are clear, up-to-date, and match the information you provided during registration.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="reg-2" className={state.key == 'reg-2' ? 'text-green-500' : ''} onClick={ handleClick }>How long does it take to verify documents?</p>
                <p className='hidden'>
                    Document verification usually takes between <strong>24 to 48 hours</strong> after submission. <br /><br />
                    In some cases, if additional checks are required or if the submitted documents are unclear, it may take a little longer. We will notify you via email if we need any further information.<br /><br />
                    Thank you for your patience while we ensure a secure and verified platform.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="reg-3" className={state.key == 'reg-3' ? 'text-green-500' : ''} onClick={ handleClick }>Can I have more than one account?</p>
                <p className='hidden'>
                    Each user is allowed to have only <strong>one account</strong> to ensure security and maintain accurate records. <br /><br />
                    Creating multiple accounts may lead to verification issues or account suspension. <br /><br />
                    If you need to update your details or switch roles (e.g., from client to pharmacy), please contact our support team — we’re here to help!
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="reg-4" className={state.key == 'reg-4' ? 'text-green-500' : ''} onClick={ handleClick }>I can't verify my email address</p>
                <p className='hidden'>
                    If you're having trouble verifying your email address, please try the following steps:<br /><br />
                    • Check your spam or junk folder — sometimes the verification email ends up there.<br />
                    • Make sure you entered the correct email address during registration.<br />
                    • If you didn't receive the email, click the "Resend Verification Email" option on the login page.<br /><br />
                    Still having issues? Contact our support team, and we'll help you verify your account as quickly as possible.
                </p>
            </div>
        </div>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: 'Accounts',
    children: (
        <div className='border-l-2 border-green-500'>
            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="acc-1" className={state.key == 'acc-1' ? 'text-green-500' : ''} onClick={ handleClick }>
                    How can I delete my account?
                </p>
                <p className='hidden'>
                    We’re sorry to see you go! To <strong>delete your account</strong>, please contact our support team through the in-app chat or send an email to <strong>support@example.com</strong>. <br /><br />
                    Once we receive your request, we will verify your identity and process the deletion within <strong>2-5 business days</strong>. <br /><br />
                    Keep in mind that this action is <strong>permanent</strong> and all your data, including appointments and orders, will be removed.
                </p>
            </div>
            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="acc-2" className={state.key == 'acc-2' ? 'text-green-500' : ''} onClick={ handleClick }>
                    Can I change my email address?
                </p>
                <p className='hidden'>
                    Yes, you can <strong>change your email address</strong> from your account settings. <br /><br />
                    Go to the <strong>Profile</strong> section and select <strong>"Edit Email"</strong>. You will be asked to verify the new email by clicking a confirmation link sent to it. <br /><br />
                    If you face any issues, feel free to contact our support team for assistance.
                </p>
            </div>
        </div>
    ),
    style: panelStyle,
  },
  {
    key: '3',
    label: 'Pricing & Payments',
    children: (
        <div className='border-l-2 border-green-500'>
            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="pay-1" className={state.key == 'pay-1' ? 'text-green-500' : ''} onClick={ handleClick }>
                    Can I pay after receiving the medicines?
                </p>
                <p className='hidden'>
                    Currently, we operate on a <strong>prepaid basis</strong> for all medicine orders to ensure smooth processing and delivery. <br /><br />
                    We do not offer cash on delivery (COD) at the moment. Please complete payment online during checkout to confirm your order. <br /><br />
                    If you have special requests, please contact our support team before placing the order.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="pay-2" className={state.key == 'pay-2' ? 'text-green-500' : ''} onClick={ handleClick }>
                    Can I pay with Paypal?
                </p>
                <p className='hidden'>
                    At this time, we <strong>do not support PayPal</strong> as a payment option. <br /><br />
                    Accepted payment methods include credit/debit cards and other secure online payment gateways available at checkout. <br /><br />
                    We are continuously working to expand our payment options, so stay tuned for future updates.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="pay-3" className={state.key == 'pay-3' ? 'text-green-500' : ''} onClick={ handleClick }>
                    Does the website take control of the medicine prices?
                </p>
                <p className='hidden'>
                    No, the prices are <strong>set by the pharmacies</strong> registered on our platform. <br /><br />
                    We act as a marketplace connecting users with pharmacies but do not control or adjust the pricing of medicines. <br /><br />
                    You can compare prices across pharmacies before placing your order to choose the best option for you.
                </p>
            </div>
        </div>
    ),
    style: panelStyle,
  },
  {
    key: '4',
    label: 'Shipping & Delivery',
    children: (
        <div className='border-l-2 border-green-500'>
            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="del-1" className={state.key == 'del-1' ? 'text-green-500' : ''} onClick={ handleClick }>
                    Does the website offer delivery of medicines?
                </p>
                <p className='hidden'>
                    Yes, we offer <strong>home delivery</strong> of medicines through our partnered pharmacies. <br /><br />
                    Once you place an order, the selected pharmacy will prepare and ship your medicines directly to your provided address. <br /><br />
                    Delivery times may vary depending on your location and the pharmacy's processing speed, but we strive to ensure timely delivery for all orders.
                </p>
            </div>
        </div>
    ),
    style: panelStyle,
  },
  {
    key: '5',
    label: 'Security & Privacy',
    children: (
        <div className='border-l-2 border-green-500'>
            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="sec-1" className={state.key == 'sec-1' ? 'text-green-500' : ''} onClick={ handleClick }>
                    How do you protect my personal information?
                </p>
                <p className='hidden'>
                    We take your privacy seriously. Your personal information is encrypted using <strong>SSL encryption</strong> to ensure its security during transmission. <br /><br />
                    Additionally, we follow strict data protection guidelines to safeguard your information from unauthorized access or misuse. Your data is stored securely in our systems, accessible only to authorized personnel.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="sec-2" className={state.key == 'sec-2' ? 'text-green-500' : ''} onClick={ handleClick }>
                    Who can see my information?
                </p>
                <p className='hidden'>
                    Your personal information is only accessible to our authorized staff and partners who need it to process your orders, manage your account, or provide customer support. <br /><br />
                    We do not share your personal information with third parties without your consent, except as required by law or necessary for processing orders and deliveries.
                </p>
            </div>

        </div>
    ),
    style: panelStyle,
  },
  {
    key: '6',
    label: 'Display & Preferences',
    children: (
        <div className='border-l-2 border-green-500'>
            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="pref-1" className={state.key == 'pref-1' ? 'text-green-500' : ''} onClick={ handleClick }>
                    Is dark theme available?
                </p>
                <p className='hidden'>
                    Yes, we offer a dark theme option to make browsing easier on your eyes, especially in low-light environments. <br /><br />
                    You can toggle between dark and light themes in your profile settings or from the theme toggle button located at the top of the page.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="pref-2" className={state.key == 'pref-2' ? 'text-green-500' : ''} onClick={ handleClick }>
                    How can I change the font of the text?
                </p>
                <p className='hidden'>
                    You can change the font style by navigating to your user preferences in the settings menu. <br /><br />
                    Under the "Display Preferences" section, you'll find options to adjust the font type and size to your liking. These changes will be applied throughout the site for a customized reading experience.
                </p>
            </div>

        </div>
    ),
    style: panelStyle,
  },
  {
    key: '7',
    label: 'Reporting',
    children: (
        <div className='border-l-2 border-green-500'>
            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="rep-1" className={state.key == 'rep-1' ? 'text-green-500' : ''} onClick={ handleClick }>
                    How can I report a delayed order?
                </p>
                <p className='hidden'>
                    If you experience a delay with your order, you can report it through the "My Orders" section in your account. <br /><br />
                    Simply select the delayed order and click on "Report an Issue". You will be asked to provide details regarding the delay, and our support team will get in touch with you as soon as possible to resolve the issue.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="rep-2" className={state.key == 'rep-2' ? 'text-green-500' : ''} onClick={ handleClick }>
                    What happens when I report a product with wrong details?
                </p>
                <p className='hidden'>
                    If you report a product with incorrect details, our support team will investigate the issue and take appropriate action. <br /><br />
                    We may update the product details or remove it from the site if necessary. You will be informed of any changes or actions taken to correct the issue.
                </p>
            </div>

            <div>
                <p style={{ padding: '0.4rem 1rem', cursor: 'pointer' }} data-key="rep-3" className={state.key == 'rep-3' ? 'text-green-500' : ''} onClick={ handleClick }>
                    How long does it take to get answered when I report a product or order?
                </p>
                <p className='hidden'>
                    After reporting an issue with a product or order, our support team typically responds within 24 to 48 hours. <br /><br />
                    If additional time is needed, you will be notified with an estimated response time. We strive to resolve all reports as quickly as possible while ensuring quality service.
                </p>
            </div>

        </div>
    ),
    style: panelStyle,
  },
];
const FaqsPage = () => {

    const [selected, setSelected] = useState({key: 'reg-1', question: 'What documents do I need for verification ?', answer: <p>To complete your verification, please prepare the following documents:<br /><br />
                    • A valid government-issued ID (e.g., passport or national ID card)<br />
                    • Proof of address (e.g., utility bill or bank statement dated within the last 3 months)<br />
                    • A clear profile picture<br />
                    • Your medical license or professional certificate (for doctors and pharmacies)<br />
                    • Business registration document (for pharmacies)<br /><br />
                    Make sure all documents are clear, up-to-date, and match the information you provided during registration.</p>})

    const handleClick = (data) => {
        setSelected({
            key: data.target.dataset.key,
            question: data.target.textContent,
            answer: data.target.nextElementSibling.innerHTML
        })
    }

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 16,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    fontWeight: 500
  };
  return (

    <>
        <Navbar />

        <Container maxWidth="xl">
            <Row gutter={[40, 40]} style={{ padding: '2rem 0' }}>
                <Col xs={24} lg={10} xl={8}>
                    <Box style={{ background: token.colorBgContainer, boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)', borderRadius: 5, padding: '1.5rem 1.25rem' }}>
                        <Typography.Title level={3} style={{ marginBottom: 20 }}>Indexes</Typography.Title>
                        <Collapse
                            accordion={true}
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            expandIconPosition="end"
                            items={getItems(panelStyle, selected, handleClick)}
                        />
                    </Box>
                </Col>
                <Col xs={24} lg={14} xl={16}>
                    <Typography.Title level={2} style={{ marginBottom: 30 }}>Frequently Asked Questions</Typography.Title>
                    <Box className="bg-white rounded-md shadow" style={{ padding: '1.5rem 1.5rem' }}>
                        <Typography.Title level={4} style={{ marginBottom: 30 }}>{selected.question}</Typography.Title>
                        <TP fontSize={15} style={{ color: GRAY3 }} dangerouslySetInnerHTML={{ __html: selected.answer }} />
                    </Box>
                </Col>
            </Row>
        </Container>

        <Footer />
    </>
  );

};
export default FaqsPage;