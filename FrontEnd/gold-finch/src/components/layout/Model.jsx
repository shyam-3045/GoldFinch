import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useAlert } from '../../context/AlertMsgContext';

export default function AuthModal({isOpen , closeMod}) {
  const {alertMsg}=useAlert()
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp,setIsSignUp]=useState(!isLogin)
  const {login}=useAuth()
  const [error,setError]=useState("")

  
  const  toggleAuthMode = () => setIsLogin(!isLogin);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const endPoint=(isLogin)?"login":'signup';
    const msg=await login(endPoint,name,password,email)
    if(msg !== "success")
    {
        setError(msg)
        setTimeout(()=>
        {
            setError("")
        },3000)
        
    }
    else{
        alertMsg("Login Successfull !")
        closeMod()
        
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
  };
  if(!isOpen){
    return null;
  }

  return (
    <div className="container">
      {isOpen && (
        <>
          {/* Modal Overlay */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 100,
              animation: 'fadeIn 0.3s ease-out'
            }} 
            onClick={closeMod}
          ></div>
          
          {/* Modal Container */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '420px',
              backgroundColor: 'white',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--box-shadow)',
              zIndex: 101,
              animation: 'slideIn 0.3s ease-out',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              backgroundColor: 'var(--primary-color)',
              color: 'var(--text-light)',
              borderBottom: '1px solid var(--secondary-color)'
            }}>
              <h3 style={{ margin: 0 }}>
                {isLogin ? "Login to Your Account" : "Create an Account"}
              </h3>
              <button 
                onClick={closeMod} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-light)',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            
            {/* Modal Body */}
            <div style={{ padding: '20px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(error && <p>{error}</p> )}
              {(!isLogin&&
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="Name" style={{ fontWeight: 500, color: 'var(--text-color)' }}>Name</label>
                <input
                  type="text"
                  id="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                  required
                  style={{
                    padding: '12px',
                    border: '1px solid var(--light-color)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '16px'
                  }}
                />
              </div>

                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email" style={{ fontWeight: 500, color: 'var(--text-color)' }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      padding: '12px',
                      border: '1px solid var(--light-color)',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="password" style={{ fontWeight: 500, color: 'var(--text-color)' }}>Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{
                      padding: '12px',
                      border: '1px solid var(--light-color)',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ marginTop: '8px' }}
                >
                  {isLogin ? "Login" : "SignUp"}
                </button>
              </form>
              
              {/* Divider */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                margin: '20px 0', 
                color: 'var(--text-muted)'
              }}>
                <div style={{ flex: 1, borderTop: '1px solid var(--light-color)' }}></div>
                <span style={{ padding: '0 10px', fontSize: '14px' }}>OR</span>
                <div style={{ flex: 1, borderTop: '1px solid var(--light-color)' }}></div>
              </div>
              
              {/* Google Button */}
              <button 
                onClick={handleGoogleSignIn} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'white',
                  color: 'var(--text-color)',
                  border: '1px solid var(--light-color)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path 
                    fill="#EA4335" 
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" 
                  />
                </svg>
                Sign in with Google
              </button>
              
              {/* Toggle Mode */}
              <div style={{ 
                marginTop: '16px', 
                textAlign: 'center', 
                fontSize: '14px', 
                color: 'var(--text-muted)' 
              }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={toggleAuthMode} 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-color)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: '4px',
                    marginLeft: '4px'
                  }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            transform: translate(-50%, -60%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}