import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Welcome': 'Welcome',
      'Team Members': 'Team Members',
      'Add User': 'Add User',
      'Active Users': 'Active Users',
      'Departments': 'Departments',
      'Projects': 'Projects',
      'Integrations': 'Integrations',
      'Notifications': 'Notifications',
      'Quick Actions': 'Quick Actions',
      'Invite New User': 'Invite New User',
      'Start New Project': 'Start New Project',
      'Connect Integration': 'Connect Integration',
      'Overview': 'Overview',
      'Analytics': 'Analytics',
      'Scheduling': 'Scheduling',
      'Security': 'Security',
      'Settings': 'Settings',
      'Company Profile': 'Company Profile',
      'Save Changes': 'Save Changes',
      'Send Feedback': 'Send Feedback',
      // Add more keys as needed
    }
  },
  ja: {
    translation: {
      'Welcome': 'ようこそ',
      'Team Members': 'チームメンバー',
      'Add User': 'ユーザー追加',
      'Active Users': 'アクティブユーザー',
      'Departments': '部門',
      'Projects': 'プロジェクト',
      'Integrations': '連携',
      'Notifications': '通知',
      'Quick Actions': 'クイックアクション',
      'Invite New User': '新しいユーザーを招待',
      'Start New Project': '新しいプロジェクトを開始',
      'Connect Integration': '連携を接続',
      'Overview': '概要',
      'Analytics': '分析',
      'Scheduling': 'スケジューリング',
      'Security': 'セキュリティ',
      'Settings': '設定',
      'Company Profile': '会社プロフィール',
      'Save Changes': '変更を保存',
      'Send Feedback': 'フィードバックを送信',
      // Add more keys as needed
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 