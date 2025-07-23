import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// En production, utilisez une vraie base de données (PostgreSQL, MySQL, etc.)
// Pour la démo, on utilise une variable globale (redémarre à chaque redémarrage du serveur)
let users: any[] = [];
let adminInitialized = false;
let passwordResetTokens: any[] = [];
let emailVerificationTokens: any[] = [];

// Fonction pour initialiser le compte admin
async function initializeAdmin() {
  if (!adminInitialized) {
    const adminPassword = await bcrypt.hash('admin123', 10);
    users.push({
      id: 'admin-1',
      email: 'axel.c.e.jacquin@gmail.com',
      firstName: 'Axel',
      lastName: 'Jacquin',
      password: adminPassword,
      status: 'approved',
      isAdmin: true,
      createdAt: new Date().toISOString(),
    });
    adminInitialized = true;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  await initializeAdmin();
  
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'login':
        return handleLogin(data);
      case 'register':
        return handleRegister(data);
      case 'getUsers':
        return handleGetUsers(request);
      case 'approveUser':
        return handleApproveUser(request, data);
      case 'rejectUser':
        return handleRejectUser(request, data);
      case 'promoteToAdmin':
        return handlePromoteToAdmin(request, data);
      case 'logout':
        return handleLogout();
      case 'changePassword':
        return handleChangePassword(request);
      case 'forgotPassword':
        return handleForgotPassword(data);
      case 'resetPassword':
        return handleResetPassword(data);
      case 'verifyEmail':
        return handleVerifyEmail(data);
      case 'resendVerification':
        return handleResendVerification(data);
      default:
        return NextResponse.json({ error: 'Action non supportée' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  await initializeAdmin();
  
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}

async function handleLogin({ email, password }: { email: string; password: string }) {
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 401 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  if (user.status !== 'approved') {
    return NextResponse.json({ 
      error: user.status === 'pending' ? 'Compte en attente de validation' : 'Compte rejeté' 
    }, { status: 401 });
  }

  // Créer le token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Retourner l'utilisateur sans le mot de passe
  const { password: _, ...userWithoutPassword } = user;
  
  const response = NextResponse.json({ user: userWithoutPassword });
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 // 7 jours
  });

  return response;
}

async function handleRegister({ 
  email, 
  firstName, 
  lastName, 
  password 
}: { 
  email: string; 
  firstName: string; 
  lastName: string; 
  password: string; 
}) {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return NextResponse.json({ error: 'Un compte avec cet email existe déjà' }, { status: 400 });
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'utilisateur
  const newUser = {
    id: Date.now().toString(),
    email,
    firstName,
    lastName,
    password: hashedPassword,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  // Retourner l'utilisateur sans le mot de passe
  const { password: _, ...userWithoutPassword } = newUser;
  return NextResponse.json({ user: userWithoutPassword });
}

async function handleLogout() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('auth-token');
  return response;
}

async function handleGetUsers(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const adminUser = users.find(u => u.id === decoded.userId);
    
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    // Retourner tous les utilisateurs sans les mots de passe
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    return NextResponse.json({ users: usersWithoutPasswords });
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}

async function handleApproveUser(request: NextRequest, data: any) {
  const token = request.cookies.get('auth-token')?.value;
  const { userId } = data;
  
  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const adminUser = users.find(u => u.id === decoded.userId);
    
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].status = 'approved';
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}

async function handleRejectUser(request: NextRequest, data: any) {
  const token = request.cookies.get('auth-token')?.value;
  const { userId } = data;
  
  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const adminUser = users.find(u => u.id === decoded.userId);
    
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].status = 'rejected';
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}

// Promouvoir un utilisateur en admin
async function handlePromoteToAdmin(request: NextRequest, data: any) {
  const token = request.cookies.get('auth-token')?.value;
  const { userId } = data;
  
  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const adminUser = users.find(u => u.id === decoded.userId);
    
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].isAdmin = true;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}

// Fonction pour générer un token aléatoire
function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Fonction pour simuler l'envoi d'email (en production, utilisez un service comme SendGrid, Mailgun, etc.)
function sendEmail(to: string, subject: string, content: string) {
  console.log(`
=== EMAIL SIMULÉ ===
To: ${to}
Subject: ${subject}
Content: ${content}
==================
  `);
}

// Changer le mot de passe
async function handleChangePassword(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { currentPassword, newPassword } = await request.json();
  
  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Vérifier le mot de passe actuel
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 401 });
    }

    // Hacher le nouveau mot de passe
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    // Mettre à jour le mot de passe
    const userIndex = users.findIndex(u => u.id === decoded.userId);
    users[userIndex].password = hashedNewPassword;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }
}

// Mot de passe oublié
async function handleForgotPassword({ email }: { email: string }) {
  const user = users.find(u => u.email === email);
  
  if (!user) {
    // Pour la sécurité, ne pas révéler si l'email existe ou non
    return NextResponse.json({ success: true });
  }

  // Générer un token de réinitialisation
  const resetToken = generateToken();
  const expiresAt = new Date(Date.now() + 3600000); // 1 heure

  // Stocker le token
  passwordResetTokens.push({
    token: resetToken,
    userId: user.id,
    expiresAt,
  });

  // Nettoyer les anciens tokens
  passwordResetTokens = passwordResetTokens.filter(t => t.expiresAt > new Date());

  // Envoyer l'email (simulé)
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  sendEmail(
    email,
    'Réinitialisation de votre mot de passe',
    `Cliquez sur ce lien pour réinitialiser votre mot de passe: ${resetLink}`
  );

  return NextResponse.json({ success: true });
}

// Réinitialiser le mot de passe
async function handleResetPassword({ token, newPassword }: { token: string; newPassword: string }) {
  const resetToken = passwordResetTokens.find(t => t.token === token && t.expiresAt > new Date());
  
  if (!resetToken) {
    return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 400 });
  }

  const user = users.find(u => u.id === resetToken.userId);
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  // Hacher le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Mettre à jour le mot de passe
  const userIndex = users.findIndex(u => u.id === resetToken.userId);
  users[userIndex].password = hashedPassword;

  // Supprimer le token utilisé
  passwordResetTokens = passwordResetTokens.filter(t => t.token !== token);

  return NextResponse.json({ success: true });
}

// Vérifier l'email
async function handleVerifyEmail({ token }: { token: string }) {
  const verificationToken = emailVerificationTokens.find(t => t.token === token);
  
  if (!verificationToken) {
    return NextResponse.json({ error: 'Token de vérification invalide' }, { status: 400 });
  }

  const user = users.find(u => u.id === verificationToken.userId);
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  // Marquer l'email comme vérifié
  const userIndex = users.findIndex(u => u.id === verificationToken.userId);
  users[userIndex].emailVerified = true;

  // Supprimer le token utilisé
  emailVerificationTokens = emailVerificationTokens.filter(t => t.token !== token);

  return NextResponse.json({ success: true });
}

// Renvoyer la vérification d'email
async function handleResendVerification({ email }: { email: string }) {
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  if (user.emailVerified) {
    return NextResponse.json({ error: 'Email déjà vérifié' }, { status: 400 });
  }

  // Générer un nouveau token
  const verificationToken = generateToken();
  
  // Supprimer les anciens tokens pour cet utilisateur
  emailVerificationTokens = emailVerificationTokens.filter(t => t.userId !== user.id);
  
  // Ajouter le nouveau token
  emailVerificationTokens.push({
    token: verificationToken,
    userId: user.id,
  });

  // Envoyer l'email (simulé)
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
  sendEmail(
    email,
    'Vérification de votre email',
    `Cliquez sur ce lien pour vérifier votre email: ${verificationLink}`
  );

  return NextResponse.json({ success: true });
}
