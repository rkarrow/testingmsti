import { useState } from 'react'
import axios from 'axios'
import { FiX, FiMail, FiCheck, FiCopy, FiExternalLink, FiFileText, FiSend, FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi'

export default function CertificateModal({ isOpen, onClose }) {
  const [fullName, setFullName] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nicNumber, setNicNumber] = useState('')
  const [cdcNumber, setCdcNumber] = useState('')
  const [certificateName, setCertificateName] = useState('')
  const [dob, setDob] = useState('')
  const [certList, setCertList] = useState([
    { name: '', number: '', issuedDate: '', expireDate: '' }
  ])
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const handleAddCert = () => {
    setCertList([...certList, { name: '', number: '', issuedDate: '', expireDate: '' }])
  }

  const handleCertChange = (index, field, value) => {
    const updated = [...certList]
    updated[index][field] = value
    setCertList(updated)
  }

  const handleRemoveCert = (index) => {
    if (certList.length === 1) return
    setCertList(certList.filter((_, i) => i !== index))
  }

  const generateEmailBody = () => {
    const nameStr = fullName.trim() || '[Your Full Name]'
    const nicStr = nicNumber.trim() || '[Your NIC Number]'
    const cdcStr = cdcNumber.trim() || '[Your CDC Number]'
    const certMainStr = certificateName.trim()
    const dobStr = dob.trim()
    const emailStr = studentEmail.trim() || '[Your Email]'
    const phoneStr = phone.trim() || '[Your Phone]'
    
    let certsTable = ''
    const validCerts = certList.filter(c => c.name.trim() || c.number.trim())
    
    if (certMainStr) {
      certsTable = `Certificate Name: ${certMainStr}\nNIC Number (as in the certificate): ${nicStr}\nCDC Number: ${cdcStr}\n`
    } else if (validCerts.length > 0) {
      certsTable = validCerts.map((c, i) => 
        `Certificate ${i + 1}:\n- Certificate Name: ${c.name || 'N/A'}\n- Certificate Number: ${c.number || 'N/A'}\n- Issued Date: ${c.issuedDate || 'N/A'}\n- Expire Date: ${c.expireDate || 'Never Expires'}\n`
      ).join('\n')
    } else {
      certsTable = `Certificate Name: Advanced Fire Fighting\nNIC Number (as in the certificate): ${nicStr}\nCDC Number: ${cdcStr}\n`
    }

    return `Dear Sir / Madam,

Good day!

Could you please verify the authentication of the following certificates issued by Mercantile Seaman Training Institute at the earliest possible.

Full Name - ${nameStr}
NIC Number (as in the certificate) - ${nicStr}
CDC Number - ${cdcStr}
${dobStr ? `D.O.B – ${dobStr}\n` : ''}Contact Email – ${emailStr}
${phoneStr ? `Phone – ${phoneStr}\n` : ''}
${certsTable}
Copies of the Certificates are attached for your easy reference.

Thank you.`
  }

  const handleSendDirectly = async (e) => {
    if (e) e.preventDefault()
    setErrorMsg('')
    
    if (!fullName.trim() && !certificateName.trim()) {
      setErrorMsg('Please enter your Full Name or Certificate Name')
      return
    }
    if (!studentEmail.trim()) {
      setErrorMsg('Please enter your Contact Email Address so we can reply with the verification')
      return
    }

    try {
      setSending(true)
      const bodyText = generateEmailBody()
      
      // Submit to backend API (and target testing address)
      await axios.post('/api/contact', {
        name: fullName || 'Student Verification',
        email: studentEmail,
        phone: phone || '+94',
        subject: `Certificate Verification Request - ${fullName || certificateName} (NIC: ${nicNumber || 'N/A'})`,
        enquiryType: 'Certificate Verification',
        message: `[Recipient: manuthi.desilva@msti.lk]\n\n` + bodyText,
      })

      setSentSuccess(true)
    } catch (err) {
      // Fallback: open mail client
      const subject = encodeURIComponent(`Certificate Verification Request - ${fullName.trim() || certificateName.trim() || 'Student Verification'}`)
      const body = encodeURIComponent(generateEmailBody())
      window.location.href = `mailto:manuthi.desilva@msti.lk?subject=${subject}&body=${body}`
      setSentSuccess(true)
    } finally {
      setSending(false)
    }
  }

  const handleOpenGmail = () => {
    const subject = encodeURIComponent(`Certificate Verification Request - ${fullName.trim() || certificateName.trim() || 'Student Verification'}`)
    const body = encodeURIComponent(generateEmailBody())
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=manuthi.desilva@msti.lk&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEmailBody())
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleReset = () => {
    setSentSuccess(false)
    setFullName('')
    setStudentEmail('')
    setPhone('')
    setNicNumber('')
    setCdcNumber('')
    setCertificateName('')
    setDob('')
    setCertList([{ name: '', number: '', issuedDate: '', expireDate: '' }])
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-navy-950 border border-navy-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 text-left max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-navy-400 hover:text-white p-2 rounded-lg bg-navy-900/50 hover:bg-navy-800 transition-colors cursor-pointer"
        >
          <FiX size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FiFileText size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Certificate Verification</h2>
            <p className="text-xs text-navy-400">Official Mercantile Seaman Training Institute Verification Desk</p>
          </div>
        </div>

        {/* SUCCESS VIEW */}
        {sentSuccess ? (
          <div className="space-y-6 py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <FiCheckCircle size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Verification Request Sent Successfully!</h3>
              <p className="text-xs text-navy-300 max-w-md mx-auto leading-relaxed">
                Your certificate verification request has been dispatched to <span className="text-blue-400 font-semibold">manuthi.desilva@msti.lk</span>. Our verification officers will review your credentials and reply to <span className="text-white font-medium">{studentEmail}</span> shortly.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Official Notice Box */}
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4 text-xs leading-relaxed text-blue-200">
              <p className="font-semibold text-white mb-1">📢 Notice for Students & Employers:</p>
              <p className="italic text-blue-100">
                “Dear Students, To verify your certificates, please send an email to{' '}
                <a href="mailto:manuthi.desilva@msti.lk" className="text-amber-400 underline font-semibold">
                  manuthi.desilva@msti.lk
                </a>
                . Thank you.”
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                <FiAlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Quick Fill Form */}
            <form onSubmit={handleSendDirectly} className="space-y-4">
              {/* PRIMARY 3 REQUIRED FIELDS AS REQUESTED */}
              <div className="bg-navy-900/80 p-4 rounded-xl border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    Primary Verification Fields (3 Key Fields)
                  </h3>
                  <span className="text-[10px] text-blue-300 font-medium">Quick Fill</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-white mb-1">
                      Certificate Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Advanced Fire Fighting"
                      value={certificateName}
                      onChange={(e) => setCertificateName(e.target.value)}
                      className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white mb-1">
                      NIC Number (as in certificate) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 199812345678 / 981234567V"
                      value={nicNumber}
                      onChange={(e) => setNicNumber(e.target.value)}
                      className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white mb-1">
                      CDC Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CD/SL/12345"
                      value={cdcNumber}
                      onChange={(e) => setCdcNumber(e.target.value)}
                      className="w-full bg-navy-950 border border-navy-750 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Student Contact Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Student Contact & Identification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-navy-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Opatha Arachchi Kankanamge Tehan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-navy-300 mb-1">Your Email (for Reply) *</label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-navy-300 mb-1">Phone / D.O.B</label>
                    <input
                      type="text"
                      placeholder="+94 77 123 4567 / 11/12/1998"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-navy-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email Preview Box */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-navy-400">
                  <span>Draft Preview (Recipient: <strong className="text-blue-400">manuthi.desilva@msti.lk</strong>)</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
                <pre className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 text-xs font-mono text-navy-200 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                  {generateEmailBody()}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-navy-800 flex flex-col gap-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* DIRECT SEND BUTTON */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {sending ? <FiLoader className="animate-spin" size={16} /> : <FiSend size={16} />}
                    {sending ? 'Sending...' : 'Send Verification Request'}
                  </button>

                  {/* Open in Gmail Button */}
                  <button
                    type="button"
                    onClick={handleOpenGmail}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <FiExternalLink size={16} /> Open & Auto-Fill in Gmail
                  </button>
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex-1 bg-navy-900 hover:bg-navy-850 text-navy-200 hover:text-white font-semibold text-xs py-2.5 px-4 rounded-xl border border-navy-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {copied ? <FiCheck className="text-emerald-400" size={15} /> : <FiCopy size={15} />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-navy-900 hover:bg-navy-850 text-navy-400 hover:text-white text-xs py-2.5 px-5 rounded-xl border border-navy-800 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
